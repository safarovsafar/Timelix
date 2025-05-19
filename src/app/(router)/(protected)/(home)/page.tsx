"use client"

import { Button } from "@/components/ui/button";
import Header from "@/widgets/header/header";
import { ArrowRight, BarChart2, Calendar, CheckCircle, Clock, Github, Target } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {

  return (
    <div className="">
      <main className="">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 ">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Превратите свои мечты в цели. Ваши цели в реальность.
                </h1>
                <p className="mx-auto max-w-[700px] mt-5 text-muted-foreground md:text-xl">
                  Устанавливайте четкие сроки, составляйте ежедневные распорядки и отслеживайте свой прогресс — все в одном месте.
                </p>
              </div>
              <div className="">
                <Button size={"lg"} className="bg-gradient-to-br from-sky-400 to-indigo-500 transition-all duration-300 hover:from-sky-300/90 cursor-pointer gap-3">Начать <ArrowRight className="h-4 w-4" /></Button>
                <Button size={"lg"} variant={"outline"} className="ml-2">Узнать больше</Button>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  Функции
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
                  Все, что вам нужно для достижения ваших целей
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Наша платформа сочетает в себе постановку целей с построением рутины, чтобы помочь вам создать устойчивые привычки и достичь значимых результатов
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">

              <div className="flex flex-col justify-center space-y-4 rounded-lg border bg-background/80 p-6 shadow-lg transition-all hover:shadow-xl hover:translate-y-[-2px]">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-indigo-500 text-white">
                  <Target className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Умная постановка целей</h3>
                  <p className="text-muted-foreground">
                    Создавайте SMART-цели со сроками, контрольными точками и отслеживанием прогресса, чтобы оставаться мотивированными.
                  </p>
                </div>
              </div>

              <div className="flex flex-col justify-center space-y-4 rounded-lg border bg-background/80 p-6 shadow-lg transition-all hover:shadow-xl hover:translate-y-[-2px]">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-purple-600 text-white">
                  <Clock className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Строитель рутины</h3>
                  <p className="text-muted-foreground">
                    Разработайте утренние, вечерние и индивидуальные распорядки, которые помогут вам выработать устойчивые привычки.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4 rounded-lg border bg-background/80 p-6 shadow-lg transition-all hover:shadow-xl hover:translate-y-[-2px]">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-green-700 text-white">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Аналитика прогресса</h3>
                  <p className="text-muted-foreground">
                    Визуализируйте свой прогресс с помощью красивых диаграмм и получайте информацию для улучшения своих показателей.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
                Готовы изменить свою жизнь?
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Присоединяйтесь к тысячам пользователей, которые повысили свою производительность и достигли своих целей.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
