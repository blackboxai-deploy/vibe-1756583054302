import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold text-slate-800">
                Hyp<span className="text-blue-600">Ideas</span>
              </div>
              <Badge variant="outline" className="text-xs">Research Platform</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/auth/signin">
                <Button variant="ghost" className="text-slate-600 hover:text-slate-800">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Join Community
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-slate-800 mb-6 leading-tight">
            Where <span className="text-blue-600">Research</span> Meets{" "}
            <span className="text-amber-600">Innovation</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Connect with fellow researchers, share groundbreaking ideas, and collaborate on projects 
            that shape the future. Join a professional community of innovators, academics, and 
            industry leaders.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/auth/signup">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                Start Your Research Journey
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="px-8 py-3">
              Explore Ideas
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Professional Research Platform
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Built for academics, researchers, and innovators who value professional 
              collaboration and intellectual property development.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <div className="w-6 h-6 bg-blue-600 rounded"></div>
                </div>
                <CardTitle className="text-slate-800">Academic Networking</CardTitle>
                <CardDescription>
                  Connect with researchers worldwide. Build professional relationships 
                  with verified academics and industry experts.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                  <div className="w-6 h-6 bg-amber-600 rounded"></div>
                </div>
                <CardTitle className="text-slate-800">Innovation Hub</CardTitle>
                <CardDescription>
                  Share research findings, innovative ideas, and collaborate on 
                  projects with patent potential and commercial viability.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <div className="w-6 h-6 bg-green-600 rounded"></div>
                </div>
                <CardTitle className="text-slate-800">Professional Growth</CardTitle>
                <CardDescription>
                  Access funding opportunities, publication resources, and startup 
                  connections to transform ideas into successful ventures.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-6">
                Professional Research Environment
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-slate-800">Verified Profiles</h4>
                    <p className="text-slate-600">
                      Link your Scopus, IEEE, ORCID, and institutional profiles for credibility.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-slate-800">Research Channels</h4>
                    <p className="text-slate-600">
                      Join field-specific communities and collaborate with experts in your domain.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-slate-800">IP & Patents</h4>
                    <p className="text-slate-600">
                      Showcase patent projects and connect with investors for commercialization.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-slate-100 rounded-2xl p-8">
              <div className="aspect-square bg-white rounded-xl shadow-sm flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">80-10-10</div>
                  <p className="text-slate-600 text-sm">Professional Layout</p>
                  <p className="text-xs text-slate-500 mt-1">Feed • Channels • Messages</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Ideas?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Join thousands of researchers and innovators building the future together.
          </p>
          <Link href="/auth/signup">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
              Join Hypideas Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="text-slate-600">
              © 2024 Hypideas.com. Professional Research Platform.
            </div>
            <div className="flex space-x-6 text-sm text-slate-500">
              <a href="#" className="hover:text-slate-700">Privacy Policy</a>
              <a href="#" className="hover:text-slate-700">Terms of Service</a>
              <a href="#" className="hover:text-slate-700">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}