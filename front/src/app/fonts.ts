import { Poppins, EB_Garamond } from "next/font/google"

export const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
})

export const ebGaramond = EB_Garamond({
  weight: ["400", "500", "600", "700"],
  variable: "--font-ebGaramond",
  subsets: ["latin"],
  display: "swap",
})
