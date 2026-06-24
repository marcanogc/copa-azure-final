# Guia de Portal — Aula 1 (F1: Service Bus + Functions) no ambiente HML do Raphael

> **Objetivo:** montar a F1 (fila + funções) **no ambiente que já existe** (`rg-hml-tik-cin-001`, Central India, subscription `SUBS - HML`), aproveitando o banco, a VNet e o plano B1 do Raphael.
>
> **Divisão de trabalho:**
> - **Azure (recursos + parametrização)** → você monta **na mão no portal**, seguindo este guia.
> - **Código** → deploy via **GitHub Actions** (`deploy-phase-01.yml`), **um único deploy** ao final.
>
> **Pré-condições já validadas (2026-06-22):** banco `FIFA2026Tickets` online (privado); VNet `vnet-prd-inf-cin-001` (10.1.0.0/16) com subnet `snet-prd-inf-appsvc-cin-001` (já integrada aos apps); DNS privado do SQL configurado; providers ServiceBus/Insights/OperationalInsights ativados; plano `asp-prd-tk-cin-001` (B1) hospeda backend+frontend dentro da VNet.

---

## Convenção de nomes (padrão CAF do ambiente)

| Recurso | Nome | Observação |
|---|---|---|
| Resource Group | `rg-hml-tik-cin-001` | **já existe** — use este |
| Service Bus namespace | `sb-dev-tk-cin-001` | único global; se ocupado, use `-002` |
| Fila | `tickets-purchase` | fixo (o código espera este nome) |
| Storage Account | `stdevtkcin001` | minúsculo, sem hífen, ≤24 chars; se ocupado, ajuste dígitos |
| Log Analytics | `log-dev-tk-cin-001` | base do App Insights |
| Application Insights | `appi-dev-tk-cin-001` | — |
| Function App | `func-dev-tk-cin-001` | rodará no plano B1 existente |

> **Região de tudo: Central India** (mesma do RG, evita latência ao banco).

---

## Fase 1 — Service Bus (a fila)

### 1.1 Criar o Namespace
1. Portal → busca **"Service Bus"** → **`+ Create`**.
2. **Subscription:** `SUBS - HML` · **Resource group:** `rg-hml-tik-cin-001`
3. **Namespace name:** `sb-dev-tk-cin-001`
4. **Location:** **Central India**
5. **Pricing tier:** **Standard** ⚠️ (não Basic)
6. **`Review + create`** → **`Create`** → **`Go to resource`**.

### 1.2 Criar a fila
1. No namespace → **Entities → Queues** → **`+ Queue`**.
2. **Name:** `tickets-purchase`
3. **Max delivery count:** `10` · **Lock duration:** `30` segundos
4. **`Create`**. (A DLQ é criada automaticamente.)

✅ **Checkpoint:** fila `tickets-purchase` listada. *(A connection string a gente pega depois — Fase 4.)*

---

## Fase 2 — Storage + Application Insights

### 2.1 Storage Account (apoio da Function)
1. Portal → **"Storage accounts"** → **`+ Create`**.
2. **RG:** `rg-hml-tik-cin-001` · **Name:** `stdevtkcin001` · **Region:** **Central India**
3. **Performance:** Standard · **Redundancy:** **LRS** (mais barato, suficiente)
4. **`Review + create`** → **`Create`**.

### 2.2 Log Analytics Workspace
1. Portal → **"Log Analytics workspaces"** → **`+ Create`**.
2. **RG:** `rg-hml-tik-cin-001` · **Name:** `log-dev-tk-cin-001` · **Region:** **Central India** → **`Create`**.

### 2.3 Application Insights
1. Portal → **"Application Insights"** → **`+ Create`**.
2. **RG:** `rg-hml-tik-cin-001` · **Name:** `appi-dev-tk-cin-001` · **Region:** **Central India**
3. **Workspace:** selecione `log-dev-tk-cin-001` (criado acima) → **`Create`**.

✅ **Checkpoint:** Storage + Log Analytics + App Insights criados no RG.

---

## Fase 3 — Function App (no plano B1 existente, dentro da rede)

> Aqui está o aproveitamento: a Function entra no **plano B1 do Raphael**, que **já está na VNet** → alcança o banco privado sem sub-rede nova.

### 3.1 Criar a Function App
1. Portal → **"Function App"** → **`+ Create`** → escolha o plano de hospedagem **"App Service plan"** (não Consumption).
2. **Basics:**
   - **RG:** `rg-hml-tik-cin-001`
   - **Function App name:** `func-dev-tk-cin-001`
   - **Do you want to deploy code or container?** Code
   - **Runtime stack:** **.NET** · **Version:** **8 (isolated)**
   - **Region:** **Central India**
   - **Operating System:** **Windows** (mesmo do plano B1)
3. **Hosting / Plan:**
   - **App Service plan:** selecione o existente **`asp-prd-tk-cin-001`** (não crie um novo)
4. **Storage:** selecione `stdevtkcin001`.
5. **Monitoring:** Application Insights = **Yes** → `appi-dev-tk-cin-001`.
6. **`Review + create`** → **`Create`**.

### 3.2 Ligar a Function na rede privada (VNet integration)
1. Abra a `func-dev-tk-cin-001` → menu **Networking**.
2. Em **Outbound traffic / VNet integration** → **Add VNet integration**.
3. **VNet:** `vnet-prd-inf-cin-001` · **Subnet:** `snet-prd-inf-appsvc-cin-001` (a mesma dos apps) → **`Connect`**.
4. Confirme que `WEBSITE_VNET_ROUTE_ALL` fica habilitado (rota todo o tráfego pela VNet → alcança o SQL privado).

### 3.3 Ligar o "Always On"
1. Function → **Settings → Configuration → General settings**.
2. **Always On:** **On** → **`Save`**. *(Necessário para o gatilho do Service Bus funcionar em plano dedicado.)*

✅ **Checkpoint:** Function criada, integrada à VNet, Always On ligado.

---

## Fase 4 — Parametrização (App Settings / endpoints) — via portal

> Function → **Settings → Environment variables / Application settings** → adicionar cada uma → **`Save`**.

| Nome do App Setting | Valor | De onde vem |
|---|---|---|
| `ServiceBusConnection` | connection string do namespace `sb-dev-tk-cin-001` **SEM `EntityPath`** | Service Bus → **Shared access policies** → `RootManageSharedAccessKey` → Primary Connection String |
| `SqlConnectionString` | `Server=sql-dev-tk-cin-001.database.windows.net,1433;Database=FIFA2026Tickets;User Id=adminsql;Password=<senha>;Encrypt=true;TrustServerCertificate=true` | mesma do backend (já conhecida) |
| `FUNCTIONS_WORKER_RUNTIME` | `dotnet-isolated` | fixo |
| `FUNCTIONS_EXTENSION_VERSION` | `~4` | fixo |

> ⚠️ **Armadilha do `EntityPath`:** copie a connection string **do namespace** (RootManageSharedAccessKey), não da fila. Se vier `;EntityPath=tickets-purchase` no final, **remova** essa parte.
>
> ⚠️ **Segredo:** a senha do banco não deve ser commitada em lugar nenhum — entra só aqui, no App Setting (ou, idealmente, como referência ao Key Vault `kv-dev-tk-cin-001`).

✅ **Checkpoint:** 4 App Settings salvos; a Function reinicia sozinha.

---

## Fase 5 — Banco: aplicar as 3 colunas (migrations via GitHub Actions)

A Function consumer grava em `purchases` usando colunas que **podem ainda não existir** no banco:
`source`, `correlation_id` (migration `phase-01.sql`) e `entra_oid` (migration `phase-03.sql` — **obrigatória mesmo na F1**, senão o INSERT falha e a mensagem cai na DLQ).

As migrations estão em `fifa2026-api/database/migrations/phase-01.sql` e `phase-03.sql` (aditivas e **idempotentes** — rodar de novo não causa efeito colateral).

> **Decisão (2026-06-24):** as migrations rodam **via GitHub Actions** (`migrate-phase-01.yml`), não na mão. Como o SQL está com **Public Network Access = Disabled**, o workflow liga o acesso público + abre o firewall **só para o IP do runner**, roda as migrations e **reverte tudo** (remove a regra + desliga o público), mesmo em caso de falha. É um passo **pré-workshop** (roda uma vez por ambiente), separado do deploy de código.

### 5.1 Pré-requisito — Service Principal (App Registration) **pelo portal**

O workflow precisa de uma credencial Azure para ligar/desligar o acesso ao SQL. Crie via portal (mesma pegada do resto do guia — sem CLI):

**A) Registrar o app (Microsoft Entra ID)**
1. Portal → **Microsoft Entra ID** → **App registrations** → **`+ New registration`**.
2. **Name:** `sp-fifa2026-migrate` · **Supported account types:** *Single tenant* → **`Register`**.
3. Na **Overview**, copie **Application (client) ID** e **Directory (tenant) ID**.

**B) Criar o client secret**
1. No app → **Certificates & secrets** → **`+ New client secret`** → descrição + expiração → **`Add`**.
2. **Copie na hora o `Value`** do secret (ele some depois de sair da tela).

**C) Dar permissão no Resource Group**
1. Portal → RG **`rg-hml-tik-cin-001`** → **Access control (IAM)** → **`+ Add` → `Add role assignment`**.
2. **Role:** **Contributor** (ou, mais estreito, **SQL Server Contributor**) → **`Next`**.
3. **Assign access to:** *User, group, or service principal* → **`+ Select members`** → busque `sp-fifa2026-migrate` → selecione → **`Review + assign`**.

**D) Montar o JSON do `AZURE_CREDENTIALS`**
Com os valores acima + o **Subscription ID** (Portal → **Subscriptions**), monte o JSON que vai no secret (passo 5.2):
```json
{
  "clientId": "<Application (client) ID>",
  "clientSecret": "<Value do client secret>",
  "subscriptionId": "<Subscription ID>",
  "tenantId": "<Directory (tenant) ID>"
}
```

> Em produção real, prefira **OIDC / Federated Credential** em vez de client secret de longa duração.

### 5.2 Configurar secrets + variables no fork

GitHub (fork) → **Settings → Secrets and variables → Actions**:

| Tipo | Nome | Valor |
|---|---|---|
| Secret | `AZURE_CREDENTIALS` | o JSON do SP (passo 5.1) |
| Secret | `SQL_CONNECTION_STRING` | `Server=sql-dev-tk-cin-001.database.windows.net,1433;Database=FIFA2026Tickets;User Id=adminsql;Password=<senha>;Encrypt=true;TrustServerCertificate=true` |
| Variable | `PHASE01_SQL_SERVER` | `sql-dev-tk-cin-001` |
| Variable | `PHASE01_RESOURCE_GROUP` | `rg-hml-tik-cin-001` |

> ⚠️ A senha entra **só** no secret `SQL_CONNECTION_STRING` — nunca commitada.

### 5.3 Rodar o workflow

**Actions → "Migrate Phase 01 — DB schema" → Run workflow** (na branch `phase-01-servicebus-functions` ou `main`).

O workflow: `az login` (SP) → liga público + firewall do runner → aplica `phase-01.sql` e `phase-03.sql` (via `azure/sql-action`, que entende os batches `GO`) → **reverte** o acesso. Confira no log das migrations as colunas `source`, `correlation_id`, `entra_oid` e os índices `UQ_purchases_correlation_id` / `IX_purchases_entra_oid`.

---

## Fase 6 — Deploy do código (GitHub Actions — único por fase)

> Esta é a **única** parte de código. Não publique pelo portal — use o workflow da fase.

1. No **GitHub (fork)**, configure:
   - **Variable** `PHASE01_FUNCTION_APP_NAME` = `func-dev-tk-cin-001`
   - **Secret** `PHASE01_FUNCTION_PUBLISH_PROFILE` = baixe da Function (Overview → **Get publish profile**) e cole o conteúdo.
2. Garanta que o **SCM basic auth** está habilitado na Function (Configuration → **General settings → SCM Basic Auth Publishing = On**) — senão a action dá 401.
3. Dispare o workflow **`deploy-phase-01.yml`** (na branch `phase-01-servicebus-functions`, ou via *Run workflow*).
4. O workflow publica o código e roda o smoke test.

✅ **Checkpoint final (teste ponta a ponta):**
- `POST /api/v2/purchase` → `202` + `correlationId`
- mensagem aparece na fila e é consumida
- `purchases` recebe o registro com `source='v2'`
- compra inválida (matchId inexistente) → vai para a DLQ após 10 tentativas

---

## Resumo do que aproveitamos vs criamos

| Aproveitado (já existia) | Criado nesta aula |
|---|---|
| Banco `FIFA2026Tickets` | Service Bus + fila |
| VNet + subnet `appsvc` + DNS privado | Storage Account |
| Plano B1 `asp-prd-tk-cin-001` | Log Analytics + App Insights |
| (apps backend/frontend intocados) | Function App (no plano B1) |
