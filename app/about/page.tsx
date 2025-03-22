import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">About Nigerian Budget Tracker</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Nigerian Budget Tracker aims to make state budget information accessible and understandable to all Nigerians. We believe that transparency in government spending is essential for a thriving democracy.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>How We Work</CardTitle>
          </CardHeader>
          <CardContent>
            <p>We collect publicly available budget data from all 36 Nigerian states and present it in easy-to-understand charts and graphs. Our goal is to empower citizens with knowledge about how their state&apos;s resources are being allocated.</p>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Why This Matters</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2">
            <li>Promotes government accountability</li>
            <li>Helps citizens make informed decisions</li>
            <li>Encourages public participation in the budget process</li>
            <li>Highlights areas of success and areas needing improvement in each state</li>
          </ul>
        </CardContent>
      </Card>
      <div className="text-center mt-8">
        <p className="text-xl">Together, we can build a more transparent and prosperous Nigeria.</p>
      </div>
    </div>
  )
}

