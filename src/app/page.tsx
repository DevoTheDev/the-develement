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
          className="items-center h-max gap-8" id="experience">
          <D_Background backgroundClassName="bg-gradient-to-b from-white/58 via-white/70 to-white">
            <div className="w-full flex justify-center" >
              <div className="flex md:w-3/4 w-full">
                <D_Carousel
                  items={[
                    (
                      <div className="w-full px-12">
                        <TechStack padded />
                      </div>
                    ),
                    (
                      <div className="w-full md:px-[15%] overflow-y-clip" >
                        <MyResume />
                      </div>
                    ),
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
