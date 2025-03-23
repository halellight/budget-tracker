import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { PieChart, BarChart3, Building2 } from "lucide-react"
import { FeaturedStateCard } from "@/components/featured-state-card"

export default function Home() {
  return (
    <div className="">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            <h1 className="text-4xl tracking-tight font-extrabold text-foreground sm:text-5xl md:text-6xl">
              <span className="block xl:inline">Nigerian Budget</span>{' '}
              <span className="block text-primary xl:inline">Tracker</span>
            </h1>
            <p className="mt-3 text-base text-muted-foreground sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
              Empowering citizens with transparent access to state budget allocations and commodity production data
            </p>
            <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
              <Link href="/states">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                  Explore States
                </Button>
              </Link>
            </div>
          </div>
                    {/* Right Column - Card */}
          <div className="w-full  mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
            <div className="relative max-w-lg mx-auto">
              <div className="absolute -inset-1 rounded-2xl"></div>
              <Card className="relative  border-zinc-800/50 p-6 backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 flex items-center justify-between bg-black p-4 rounded-lg">
                    <div>
                      <p className="text-sm text-zinc-400">
                        Lagos State Budget 2024
                      </p>
                      <p className="text-2xl font-bold text-white">₦2.25T</p>
                    </div>
                    <PieChart className="h-8 w-8 text-green-500" />
                  </div>
                  <div className="bg-black p-4 rounded-lg">
                    <BarChart3 className="h-6 w-6 text-green-500 mb-2" />
                    <p className="text-sm text-zinc-400">Capital Expenditure</p>
                    <p className="text-lg font-semibold text-white">₦1.45T</p>
                  </div>
                  <div className="bg-black p-4 rounded-lg">
                    <Building2 className="h-6 w-6 text-green-500 mb-2" />
                    <p className="text-sm text-zinc-400">
                      Recurrent Expenditure
                    </p>
                    <p className="text-lg font-semibold text-white">₦0.80T</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <section className="container mx-auto px-4 py-10 md:py-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center">Featured States</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {["Lagos", "Kano", "Rivers"].map((state) => (
            <FeaturedStateCard key={state} state={state} />
          ))}
        </div>
      </section>

      <section className="">
        <div className="container mx-auto px-4 py-10 md:py-16">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Why Track State Budgets?</h2>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Understanding how our states allocate resources is crucial for every Nigerian citizen. Our platform
                  provides easy-to-understand visualizations of budget data and commodity production.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">✓ Track government spending</li>
                  <li className="flex items-center gap-2">✓ Monitor development projects</li>
                  <li className="flex items-center gap-2">✓ Compare state performances</li>
                  <li className="flex items-center gap-2">✓ Make informed decisions</li>
                </ul>
              </div>
            </div>
            <div className="relative h-[300px] md:h-[400px] mt-6 md:mt-0">
              <img
                src="/infographic.jpg"
                style={{ objectFit: "cover" }}
                alt="Budget tracking infographic"
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}




