import HomeContainer from "@/containers/home"
import Link from "next/link"

export default function Home() {
  return (
  <div>
   <HomeContainer/>

    <Link href="/docs/packageApp">PackageApp</Link>
  </div>
  )
}
