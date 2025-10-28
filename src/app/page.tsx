'use client'
import D_Background from "@/components/D_Components/D_Background"
import D_Carousel from "@/components/D_Components/D_Carousel"
import D_Transition from "@/components/D_Components/D_Transition"
import HeroCardMobile from "@/components/me/HeroCard/HeroCardMobile"
import MyResume from "@/components/me/MyResume"
import TechStack from "@/components/me/TechUsed/TechStack"
import MyTitlePage from "@/components/me/MyTitlePage"
import D_Button from "@/components/D_Components/D_Button"
import { redirect } from "next/navigation"

export default function Home() {

  return (
    <D_Background invert >
      <D_Transition>
        <D_Transition.Section id="intro">
          <div className="bg-gradient-to-b from-black via-white/0 to-white/10 items-center flex justify-center h-screen w-full" >
            <MyTitlePage />
          </div>
        </D_Transition.Section>
        <D_Transition.Section id="experience">
          <div
            className={`
          items-center flex justify-center h-screen w-full
          bg-gradient-to-b from-white/10 via-white/30 to-white/70
          `}>
            <HeroCardMobile />
          </div>
        </D_Transition.Section>
        <D_Transition.Section
          className="items-center h-screen gap-8" id="experience">
          <D_Background backgroundClassName="bg-gradient-to-b from-white/58 via-white/70 to-white">
            <div>
              <div className=" hidden md:flex" >
                <div className="w-1/2 " >
                  <MyResume />
                </div>
                <div className="w-full" >
                  <TechStack />
                </div>
              </div>
              <div className="flex md:hidden">
                <D_Carousel
                  items={[
                    (<MyResume />),
                    (<div className="flex flex-col gap-6 w-full">
                      <span className="text-black/70 text-3xl font-bold text-center" >Tech Stack</span>
                      <TechStack />
                    </div>)
                  ]}
                />
              </div>
            </div>
          </D_Background>
        </D_Transition.Section>
        <D_Transition.Section id="sign-in">
          <D_Background  >
            <div
              onClick={() => redirect("/sign-in")}
              className="flex md:self-start self-center items-center md:ml-[20%] gap-6 transform-content duration-300 hover:scale-130" >
              <D_Button
                label="See the Site"
                className={`text-black/50 text-2xl font-bold`}
                disableDefault
              />
              <D_Button
                icon="ChevronRight"
                className="text-3xl opacity-50 pt-1"
              />
            </div>
          </D_Background>
        </D_Transition.Section>
      </D_Transition>
    </D_Background >
  )
}
