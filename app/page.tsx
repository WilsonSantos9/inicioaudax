'use client'

import { useState } from 'react'
import Image from 'next/image'
import { CirclePlay, Play, Lock, ExternalLink, ArrowRight, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'

export default function Home() {
  const [activeTab, setActiveTab] = useState('phase-1')
  const [completedPhases, setCompletedPhases] = useState<string[]>([])
  const [showCourseModal, setShowCourseModal] = useState(false)

  const progress = (completedPhases.length / 3) * 100

  const handleNext = (currentPhase: string) => {
    if (!completedPhases.includes(currentPhase)) {
      setCompletedPhases([...completedPhases, currentPhase])
    }

    if (currentPhase === 'phase-1') {
      setActiveTab('phase-2')
    } else if (currentPhase === 'phase-2') {
      setActiveTab('phase-3')
    }
  }

  const videos = [
    {
      title: 'Aula 1',
      thumbnail: '/images/capa-aula-1.png',
      duration: '3:33'
    },
    {
      title: 'Aula 2',
      thumbnail: '/images/capa-aula-2.png',
      duration: '5:46'
    },
    {
      title: 'Tenha acesso ao Valore Tracker',
      thumbnail: '/images/capa-valore-tracker.png',
      duration: '6:24'
    }
  ]

  return (
    <main className="min-h-screen bg-background">
      <div
        className={`fixed inset-0 bg-background z-50 transition-transform duration-500 ${
          showCourseModal ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="relative h-full overflow-auto">
          <Button
            onClick={() => setShowCourseModal(false)}
            className="absolute top-4 right-4 z-10 hover:bg-accent hover:text-accent-foreground h-10 w-10"
          >
            <X className="h-6 w-6" />
          </Button>

          <div className="container max-w-4xl mx-auto px-4 py-16">
            <div className="space-y-6">
              <div className="flex items-center">
                <h1 className="text-2xl sm:text-3xl font-bold">Mini Curso de Trading</h1>
              </div>
              <p className="text-muted-foreground text-lg">
                Assista às aulas do mini curso para aprender os fundamentos do trading e começar a operar com mais confiança.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {videos.map((video, index) => (
                  <div
                    key={index}
                    className="group cursor-pointer bg-muted/50 hover:bg-muted rounded-lg overflow-hidden transition-all duration-300 hover:scale-105"
                  >
                    <div className="relative aspect-video">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#082DF7]/20 to-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button className="rounded-full bg-[#082DF7] hover:bg-[#082DF7]/90 text-white h-12 w-12 shadow-lg">
                          <Play className="h-6 w-6 ml-1" />
                        </Button>
                      </div>
                      <Image
                        src={video.thumbnail}
                        alt={video.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                        {video.duration}
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium group-hover:text-[#082DF7] transition-colors text-sm sm:text-base">
                        {video.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-screen flex flex-col">
        <div className="container max-w-4xl mx-auto px-4 py-6 sm:py-8 flex-grow">
          <div className="flex flex-col items-center mb-6 sm:mb-8">
            <div className="flex items-center justify-center mb-4 sm:mb-6">
              <Image
                src="/images/LOGOAUDAX.png"
                alt="AUDAX Logo"
                width={180}
                height={40}
                className="h-8 sm:h-10 w-auto"
              />
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="mb-1">
              <Progress value={progress} className="-mt-6 mb-3" />
            </div>

            <TabsList className="grid grid-cols-3 mb-6 sm:mb-8 bg-[#111827] p-1 rounded-md h-auto">
              <TabsTrigger
                value="phase-1"
                className="data-[state=active]:bg-transparent data-[state=active]:text-white text-gray-400 rounded-md h-12 px-4 text-base py-1.5"
              >
                <span className="mr-2">1.</span>
                <span className="hidden xs:inline">Criar Conta</span>
                <span className="xs:hidden">Criar</span>
              </TabsTrigger>
              <TabsTrigger
                value="phase-2"
                disabled={!completedPhases.includes('phase-1')}
                className="data-[state=active]:bg-transparent data-[state=active]:text-white text-gray-400 rounded-md h-12 px-4 text-base py-1.5"
              >
                <span className="mr-2">2.</span>
                <span className="hidden xs:inline">Faça seu depósito</span>
                <span className="xs:hidden">Depósito</span>
                {!completedPhases.includes('phase-1') && (
                  <Lock className="w-4 h-4 text-amber-500 ml-2" />
                )}
              </TabsTrigger>
              <TabsTrigger
                value="phase-3"
                disabled={!completedPhases.includes('phase-2')}
                className="data-[state=active]:bg-transparent data-[state=active]:text-white text-gray-400 rounded-md h-12 px-4 text-base py-1.5"
              >
                <span className="mr-2">3.</span>
                <span className="hidden xs:inline">Desbloquear IA</span>
                <span className="xs:hidden">IA</span>
                {!completedPhases.includes('phase-2') && (
                  <Lock className="w-4 h-4 text-amber-500 ml-2" />
                )}
              </TabsTrigger>
            </TabsList>

            <div className="mb-6">
              <button
                onClick={() => setShowCourseModal(true)}
                className="w-full bg-gradient-to-r from-[#082DF7] to-[#3b5af8] hover:from-[#0726d9] hover:to-[#2a4af0] text-white px-6 py-2.5 rounded-md flex items-center justify-center gap-2 transition-all duration-300 font-medium text-sm h-10"
              >
                <CirclePlay className="h-5 w-5" />
                Assista o Mini Curso
              </button>
            </div>

            <TabsContent value="phase-1" className="opacity-100">
              <Card className="w-full transition-all duration-300">
                <CardHeader className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
                    <div>
                      <CardTitle className="text-lg sm:text-xl mb-1 sm:mb-2">
                        Crie sua Conta Agora
                      </CardTitle>
                      <CardDescription className="text-sm">
                        Crie sua conta na corretora que eu opero. É 100% gratuita e, com ela, você já vai conseguir acompanhar minhas lives e usar o mesmo sistema que eu.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6">
                  <div className="relative aspect-video bg-muted rounded-md overflow-hidden">
                    <iframe
                      id="panda-7c9c8278-c53f-4f7e-b87c-b3acb4eaa4e7"
                      src="https://player-vz-1e8b2fdb-306.tv.pandavideo.com.br/embed/?v=7c9c8278-c53f-4f7e-b87c-b3acb4eaa4e7"
                      style={{ border: 'none', position: 'absolute', top: 0, left: 0 }}
                      allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                  <div className="space-y-3 sm:space-y-4">
                    <Button className="w-full bg-[#082DF7] hover:bg-[#082DF7]/90 text-sm sm:text-base py-2 sm:py-2.5">
                      Criar Conta Agora
                      <ExternalLink className="ml-1.5 sm:ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </Button>
                    <Button
                      onClick={() => handleNext('phase-1')}
                      className="w-full bg-green-600 hover:bg-green-700 text-white text-sm sm:text-base py-2 sm:py-2.5"
                    >
                      Próxima Fase
                      <ArrowRight className="ml-1.5 sm:ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col xs:flex-row xs:justify-between pt-2 px-4 sm:px-6 pb-4 sm:pb-6 gap-2 xs:gap-0">
                  <div className="text-xs text-muted-foreground">
                    Clique em 'Próxima Fase' para continuar
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="phase-2">
              <Card className="w-full">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-lg sm:text-xl">Fase 2: Faça seu depósito</CardTitle>
                  <CardDescription>Conteúdo da fase 2</CardDescription>
                </CardHeader>
                <CardContent className="px-4 sm:px-6">
                  <Button
                    onClick={() => handleNext('phase-2')}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    Próxima Fase
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="phase-3">
              <Card className="w-full">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-lg sm:text-xl">Fase 3: Desbloquear IA</CardTitle>
                  <CardDescription>Conteúdo da fase 3</CardDescription>
                </CardHeader>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <footer className="mt-auto py-6 bg-[#020818] border-t border-[#082DF7]/15">
          <div className="container max-w-4xl mx-auto px-4">
            <p className="text-xs text-gray-300 text-center">
              As informações disponibilizadas da ValoreClub têm caráter exclusivamente educativo e informativo.
              O desempenho passado não garante resultados futuros, e não prometemos ou asseguramos qualquer tipo de retorno financeiro.
              Todas as decisões tomadas com base nos conteúdos disponibilizados são de inteira responsabilidade do usuário.
            </p>
            <p className="text-xs text-gray-400 text-center mt-2">
              © {new Date().getFullYear()} ValoreClub. Todos os direitos reservados.
            </p>
          </div>
        </footer>
      </div>
    </main>
  )
}
