import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Building2,
  ArrowUpRight,
  BarChart3,
  MapPin,
  CheckCircle,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
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
              <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl blur opacity-30"></div>
              <Card className="relative bg-black/40 border-zinc-800/50 p-6 backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 flex items-center justify-between bg-zinc-800/30 p-4 rounded-lg">
                    <div>
                      <p className="text-sm text-zinc-400">
                        Lagos State Budget 2024
                      </p>
                      <p className="text-2xl font-bold text-white">₦2.25T</p>
                    </div>
                    <PieChart className="h-8 w-8 text-green-500" />
                  </div>
                  <div className="bg-zinc-800/30 p-4 rounded-lg">
                    <BarChart3 className="h-6 w-6 text-green-500 mb-2" />
                    <p className="text-sm text-zinc-400">Capital Expenditure</p>
                    <p className="text-lg font-semibold text-white">₦1.45T</p>
                  </div>
                  <div className="bg-zinc-800/30 p-4 rounded-lg">
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

      <div className="bg-secondary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">
              Featured States
            </h2>
            <p className="mt-4 text-xl text-muted-foreground">
              Explore budget data for key Nigerian states
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {['Lagos', 'Kano', 'Rivers'].map((state) => (
              <Link key={state} href={`/state/${state.toLowerCase()}`} className="block group">
                <div className="relative bg-accent rounded-lg overflow-hidden transition-transform duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                  <div className="h-48 bg-primary flex items-center justify-center">
                    <span className="text-4xl text-primary-foreground">{state[0]}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition duration-300 ease-in-out">{state}</h3>
                    <p className="mt-2 text-muted-foreground">Explore {state} State's budget allocation and economic data</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

