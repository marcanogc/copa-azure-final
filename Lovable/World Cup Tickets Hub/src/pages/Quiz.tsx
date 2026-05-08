import React, { useState, useMemo } from 'react';
import {
  Brain, Trophy, Check, X, ArrowRight, RotateCcw, Sparkles,
  GraduationCap, BookOpen, Target, ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { quizQuestions, QUIZ_TOTAL, type QuizQuestion } from '@/data/quiz-questions';
import { cn } from '@/lib/utils';

type Phase = 'intro' | 'play' | 'result';

const DIFFICULTY_LABEL: Record<string, { label: string; color: string }> = {
  facil:   { label: 'Fácil',   color: 'bg-green-500/15 text-green-600 dark:text-green-400 border-green-500/30' },
  medio:   { label: 'Médio',   color: 'bg-yellow-500/15 text-yellow-600 dark:text-yellow-400 border-yellow-500/30' },
  dificil: { label: 'Difícil', color: 'bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/30' },
};

const LETTERS = ['A', 'B', 'C', 'D'];

interface RatingTier {
  min: number;
  title: string;
  emoji: string;
  message: string;
  color: string;
}

const RATING_TIERS: RatingTier[] = [
  {
    min: 18,
    title: 'Especialista da Copa!',
    emoji: '🏆',
    message: 'Impressionante — você poderia ser comentarista de Copa. Conhecimento de elite!',
    color: 'from-yellow-400/30 via-yellow-500/20 to-amber-500/30',
  },
  {
    min: 14,
    title: 'Bom torcedor',
    emoji: '⚽',
    message: 'Mandou bem! Você acompanha o futebol de perto e conhece bastante da história.',
    color: 'from-green-500/30 via-emerald-500/20 to-teal-500/30',
  },
  {
    min: 10,
    title: 'Conhecimento médio',
    emoji: '📚',
    message: 'Você tem uma boa base. Estude um pouco mais a história e estará no próximo nível.',
    color: 'from-blue-500/30 via-cyan-500/20 to-sky-500/30',
  },
  {
    min: 6,
    title: 'Tem o que aprender',
    emoji: '🎓',
    message: 'Acertou pontos importantes. Que tal explorar a página de seleções para aprender mais?',
    color: 'from-purple-500/30 via-fuchsia-500/20 to-pink-500/30',
  },
  {
    min: 0,
    title: 'Iniciante',
    emoji: '👶',
    message: 'A jornada está começando! O quiz é uma ótima forma de aprender — tente novamente.',
    color: 'from-slate-500/30 via-gray-500/20 to-zinc-500/30',
  },
];

function getRating(score: number): RatingTier {
  return RATING_TIERS.find((t) => score >= t.min) || RATING_TIERS[RATING_TIERS.length - 1];
}

const Quiz: React.FC = () => {
  const [phase, setPhase] = useState<Phase>('intro');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [showReview, setShowReview] = useState(false);

  const score = useMemo(
    () =>
      answers.reduce(
        (acc, answer, i) => acc + (answer === quizQuestions[i].correctIndex ? 1 : 0),
        0
      ),
    [answers]
  );

  const currentQuestion = quizQuestions[currentIndex];
  const progress = ((currentIndex + (selected !== null ? 1 : 0)) / QUIZ_TOTAL) * 100;
  const rating = getRating(score);

  function handleStart() {
    setPhase('play');
    setCurrentIndex(0);
    setAnswers([]);
    setSelected(null);
    setShowReview(false);
  }

  function handleSelect(idx: number) {
    if (selected !== null) return;
    setSelected(idx);
    setAnswers((prev) => [...prev, idx]);
  }

  function handleNext() {
    if (currentIndex + 1 < QUIZ_TOTAL) {
      setCurrentIndex((i) => i + 1);
      setSelected(null);
    } else {
      setPhase('result');
    }
  }

  function handleRetry() {
    handleStart();
  }

  // ====================================================================
  // INTRO
  // ====================================================================
  if (phase === 'intro') {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/15 mb-6">
              <Brain className="w-10 h-10 text-primary" />
            </div>
            <h1 className="font-display text-4xl md:text-6xl mb-4">
              <span className="gold-text">Quiz</span> da Copa do Mundo
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Teste seu conhecimento sobre a história das Copas FIFA com 20 perguntas
              cuidadosamente elaboradas. Receba explicações educativas em cada pergunta!
            </p>
          </div>

          <Card className="rounded-2xl border-border bg-card overflow-hidden">
            <CardContent className="p-8 space-y-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 rounded-xl bg-secondary/40 border border-border/50">
                  <Target className="w-7 h-7 text-primary mx-auto mb-2" />
                  <div className="font-display text-2xl">{QUIZ_TOTAL}</div>
                  <div className="text-xs text-muted-foreground">Perguntas</div>
                </div>
                <div className="p-4 rounded-xl bg-secondary/40 border border-border/50">
                  <BookOpen className="w-7 h-7 text-primary mx-auto mb-2" />
                  <div className="font-display text-2xl">3</div>
                  <div className="text-xs text-muted-foreground">Níveis</div>
                </div>
                <div className="p-4 rounded-xl bg-secondary/40 border border-border/50">
                  <GraduationCap className="w-7 h-7 text-primary mx-auto mb-2" />
                  <div className="font-display text-2xl">5</div>
                  <div className="text-xs text-muted-foreground">Tiers</div>
                </div>
              </div>

              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <p>
                    <strong className="text-foreground">7 fáceis</strong>, 8 médias e 5 difíceis —
                    apropriado para todos os níveis de torcedor.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <p>
                    Cada pergunta vem com uma{' '}
                    <strong className="text-foreground">explicação educativa</strong> após sua
                    resposta — você aprende algo novo a cada questão.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <p>
                    Ao final você recebe uma{' '}
                    <strong className="text-foreground">classificação personalizada</strong> e pode
                    revisar todas as suas respostas.
                  </p>
                </div>
              </div>

              <Button
                onClick={handleStart}
                size="lg"
                className="w-full gold-gradient text-base h-14"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Começar o Quiz
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // ====================================================================
  // PLAY
  // ====================================================================
  if (phase === 'play') {
    const isAnswered = selected !== null;
    const correctIndex = currentQuestion.correctIndex;
    const diff = DIFFICULTY_LABEL[currentQuestion.difficulty];

    return (
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Top bar com progresso */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3 text-sm">
              <span className="text-muted-foreground">
                Pergunta <span className="text-foreground font-medium">{currentIndex + 1}</span> de{' '}
                {QUIZ_TOTAL}
              </span>
              <span className="text-muted-foreground">
                Acertos:{' '}
                <span className="text-foreground font-medium">{score}</span>/{currentIndex + (isAnswered ? 1 : 0)}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Card da pergunta */}
          <Card
            key={currentQuestion.id}
            className="rounded-2xl border-border bg-card overflow-hidden animate-fade-in"
          >
            <CardContent className="p-6 md:p-8">
              {/* Topic + dificuldade */}
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <Badge variant="outline" className="text-xs">
                  {currentQuestion.topic}
                </Badge>
                <Badge variant="outline" className={cn('text-xs', diff.color)}>
                  {diff.label}
                </Badge>
              </div>

              {/* Pergunta */}
              <h2 className="font-display text-xl md:text-2xl mb-6 leading-snug">
                {currentQuestion.question}
              </h2>

              {/* Opções */}
              <div className="space-y-3">
                {currentQuestion.options.map((option, idx) => {
                  const isCorrect = idx === correctIndex;
                  const isSelected = idx === selected;
                  const showAsCorrect = isAnswered && isCorrect;
                  const showAsWrong = isAnswered && isSelected && !isCorrect;

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelect(idx)}
                      disabled={isAnswered}
                      className={cn(
                        'w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-3',
                        !isAnswered &&
                          'hover:border-primary/60 hover:bg-primary/5 cursor-pointer',
                        showAsCorrect &&
                          'bg-green-500/15 border-green-500 animate-pulse-once',
                        showAsWrong && 'bg-red-500/15 border-red-500',
                        isAnswered && !isSelected && !isCorrect && 'opacity-50 border-border',
                        !isAnswered && 'border-border'
                      )}
                    >
                      <span
                        className={cn(
                          'flex-shrink-0 w-9 h-9 rounded-full font-display text-lg flex items-center justify-center border-2',
                          showAsCorrect && 'bg-green-500 text-white border-green-500',
                          showAsWrong && 'bg-red-500 text-white border-red-500',
                          !isAnswered && 'border-border bg-secondary/40',
                          isAnswered && !isSelected && !isCorrect && 'border-border'
                        )}
                      >
                        {showAsCorrect ? (
                          <Check className="w-5 h-5" />
                        ) : showAsWrong ? (
                          <X className="w-5 h-5" />
                        ) : (
                          LETTERS[idx]
                        )}
                      </span>
                      <span className="text-base">{option}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explicação após responder */}
              {isAnswered && (
                <div className="mt-6 p-5 rounded-xl bg-primary/5 border border-primary/20 animate-fade-in">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="text-xs uppercase tracking-wider text-primary font-medium mb-1">
                        {selected === correctIndex ? 'Correto!' : 'Aprenda mais'}
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {currentQuestion.explanation}
                      </p>
                    </div>
                  </div>

                  <Button
                    onClick={handleNext}
                    className="w-full mt-5 gold-gradient h-12"
                  >
                    {currentIndex + 1 < QUIZ_TOTAL ? 'Próxima pergunta' : 'Ver meu resultado'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // ====================================================================
  // RESULT
  // ====================================================================
  const percentage = Math.round((score / QUIZ_TOTAL) * 100);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Hero do resultado */}
        <Card className={cn('rounded-2xl border-border overflow-hidden mb-8 bg-gradient-to-br', rating.color)}>
          <CardContent className="p-8 md:p-12 text-center">
            <div className="text-6xl mb-4">{rating.emoji}</div>
            <h1 className="font-display text-3xl md:text-5xl mb-2">{rating.title}</h1>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">{rating.message}</p>

            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
              <div className="p-4 rounded-xl bg-card/60 backdrop-blur border border-border/50">
                <div className="font-display text-3xl text-primary">{score}</div>
                <div className="text-xs text-muted-foreground">Acertos</div>
              </div>
              <div className="p-4 rounded-xl bg-card/60 backdrop-blur border border-border/50">
                <div className="font-display text-3xl text-foreground">{QUIZ_TOTAL - score}</div>
                <div className="text-xs text-muted-foreground">Erros</div>
              </div>
              <div className="p-4 rounded-xl bg-card/60 backdrop-blur border border-border/50">
                <div className="font-display text-3xl text-gold">{percentage}%</div>
                <div className="text-xs text-muted-foreground">Aproveitamento</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ações */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <Button onClick={handleRetry} className="flex-1 gold-gradient h-12">
            <RotateCcw className="w-4 h-4 mr-2" />
            Tentar novamente
          </Button>
          <Button
            onClick={() => setShowReview((v) => !v)}
            variant="outline"
            className="flex-1 h-12"
          >
            <ChevronDown
              className={cn('w-4 h-4 mr-2 transition-transform', showReview && 'rotate-180')}
            />
            {showReview ? 'Ocultar revisão' : 'Revisar respostas'}
          </Button>
        </div>

        {/* Revisão completa */}
        {showReview && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="font-display text-2xl mb-4 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-primary" />
              Revisão das 20 perguntas
            </h2>
            {quizQuestions.map((q, i) => {
              const userAnswer = answers[i];
              const isCorrect = userAnswer === q.correctIndex;
              const diff = DIFFICULTY_LABEL[q.difficulty];

              return (
                <Card key={q.id} className="rounded-xl border-border">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <Badge variant="outline" className="text-xs">
                        #{i + 1}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {q.topic}
                      </Badge>
                      <Badge variant="outline" className={cn('text-xs', diff.color)}>
                        {diff.label}
                      </Badge>
                      <Badge
                        className={cn(
                          'text-xs ml-auto',
                          isCorrect
                            ? 'bg-green-500/15 text-green-600 dark:text-green-400'
                            : 'bg-red-500/15 text-red-600 dark:text-red-400'
                        )}
                      >
                        {isCorrect ? (
                          <Check className="w-3 h-3 mr-1" />
                        ) : (
                          <X className="w-3 h-3 mr-1" />
                        )}
                        {isCorrect ? 'Acertou' : 'Errou'}
                      </Badge>
                    </div>

                    <h3 className="font-medium mb-3">{q.question}</h3>

                    <div className="space-y-2 mb-3">
                      {q.options.map((option, idx) => {
                        const isUserChoice = idx === userAnswer;
                        const isAnswerCorrect = idx === q.correctIndex;
                        return (
                          <div
                            key={idx}
                            className={cn(
                              'p-2.5 rounded-lg text-sm border flex items-center gap-2',
                              isAnswerCorrect && 'bg-green-500/10 border-green-500/40',
                              isUserChoice && !isAnswerCorrect && 'bg-red-500/10 border-red-500/40',
                              !isUserChoice && !isAnswerCorrect && 'border-border/40 bg-secondary/20'
                            )}
                          >
                            <span className="font-mono text-xs font-bold w-5 flex-shrink-0">
                              {LETTERS[idx]}
                            </span>
                            <span className="flex-1">{option}</span>
                            {isAnswerCorrect && (
                              <Check className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                            )}
                            {isUserChoice && !isAnswerCorrect && (
                              <X className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0" />
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed bg-primary/5 border border-primary/20 rounded-lg p-3">
                      <span className="font-medium text-primary">💡 </span>
                      {q.explanation}
                    </p>
                  </CardContent>
                </Card>
              );
            })}

            <Button onClick={handleRetry} className="w-full gold-gradient h-12 mt-6">
              <RotateCcw className="w-4 h-4 mr-2" />
              Fazer o quiz de novo
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
