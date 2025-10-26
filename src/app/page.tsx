'use client'
import D_Background from "@/components/D_Components/D_Background"
import D_Carousel from "@/components/D_Components/D_Carousel"
import D_Transition from "@/components/D_Components/D_Transition"
import HeroCardMobile from "@/components/me/HeroCard/HeroCardMobile"
import MyResume from "@/components/me/MyResume"
import TechStack from "@/components/me/TechUsed/TechStack"
import ColoredText from "@/components/ui/ColoredText"
import { SignInForm } from "@/app/(auth)/sign-in/_components/sign-in-form";



export default function Home() {

  return (
    <div className="flex flex-col">
      <D_Background backgroundClassName="bg-gradient-to-b from-white via-gray-100 to-black">
        <D_Transition>
          <D_Transition.Section id="intro">
            <div className="flex text-center justify-center">
              <ColoredText
                colors={['#000000', '#FFFFFF', '#FFFFFF']} // black → dark grey → white
                size="text-5xl"
                weight="font-extrabold"
                shadow={false}
              >
                Dev
              </ColoredText>
              <ColoredText
                colors={['#FFFFFF', '#FFFFFF', '#000000']} // white → light grey → black
                size="text-5xl"
                weight="font-extrabold"
                shadow={true}
              >
                Element
              </ColoredText>
            </div>
          </D_Transition.Section>
          <D_Transition.Section id="experience">
            <HeroCardMobile />
          </D_Transition.Section>
          <D_Transition.Section id="experience">
            <div className="bg-gradient-to-b from-transparent to-black hidden md:flex p-12 gap-8" >
              <div className="w-full items-center flex" >
                <MyResume />
              </div>
              <div className="w-full" >
                <TechStack />
              </div>
            </div>
            <div className="flex md:hidden  bg-gradient-to-b from-transparent to-black" >
              <D_Carousel
                items={[
                  (<MyResume />),
                  (<div className="flex flex-col gap-6">
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
    </div>
  )
}
