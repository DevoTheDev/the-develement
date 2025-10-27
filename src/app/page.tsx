'use client'
import D_Background from "@/components/D_Components/D_Background"
import D_Carousel from "@/components/D_Components/D_Carousel"
import D_Transition from "@/components/D_Components/D_Transition"
import HeroCardMobile from "@/components/me/HeroCard/HeroCardMobile"
import MyResume from "@/components/me/MyResume"
import TechStack from "@/components/me/TechUsed/TechStack"
import { SignInForm } from "@/app/(auth)/sign-in/_components/sign-in-form";
import MyTitlePage from "@/components/me/MyTitlePage"



export default function Home() {

  return (
    <D_Background backgroundClassName="bg-gradient-to-b from-white via-white/90 to-black" >
      <D_Transition>
        <D_Transition.Section id="intro">
          <div className="bg-gradient-to-b from-white via-transparent to-transparent items-center flex justify-center h-screen w-full" >
            <MyTitlePage />
          </div>
        </D_Transition.Section>
        <D_Transition.Section id="experience">
          <div className="bg-gradient-to-b items-center flex justify-center from-transparent via-black/5 to-black/10 h-screen w-full" >
            <HeroCardMobile />
          </div>
        </D_Transition.Section>
        <D_Transition.Section id="experience">
          <div className="bg-gradient-to-b from-black/10 via-transparent to-black hidden md:flex items-center h-screen gap-8 px-[10%] py-[2%]" >
            <div className="w-1/2 " >
              <MyResume />
            </div>
            <div className="w-full" >
              <TechStack />
            </div>
          </div>
          <div className="flex md:hidden bg-gradient-to-b from-black/10 via-transparent to-black" >
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
        </D_Transition.Section>
        <D_Transition.Section id="sign-in">
          <div className="w-full h-screen flex justify-center items-center text-center">
            <SignInForm />
          </div>
        </D_Transition.Section>
      </D_Transition>
    </D_Background>
  )
}
