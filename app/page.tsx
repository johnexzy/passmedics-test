import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  ShieldCheck,
  CircleCheck,
  Target,
  Stethoscope,
  Users,
  BookOpen,
  Star,
  ArrowRight,
  Heart,
  GraduationCap,
} from "lucide-react";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-16">
        <section className="max-w-4xl mx-auto px-4 py-16 text-center">
          <Badge
            variant="secondary"
            className="py-2 px-4 bg-primary/10 text-primary text-sm font-semibold mb-8 rounded-full"
          >
            <ShieldCheck className="w-4 h-4 mr-2" /> Trusted by 10,000+ Medical
            Students
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Master Medical Knowledge with{" "}
            <span className="text-primary">Confidence</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Comprehensive exam preparation combining AI-powered quizzes,
            realistic clinical cases, and intelligent study tools.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" href="/quiz">
              <div className="flex items-center">
                Practice Quiz
                <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </Button>
            <Button variant="outline" size="lg" href="/clinical-cases">
              <div className="flex items-center">
                Clinical Cases
                <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </Button>
          </div>
          <div className="flex justify-center gap-8 mt-8">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span className="font-semibold">10K+</span>
              <span className="text-gray-600">Users</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              <span className="font-semibold">50K+</span>
              <span className="text-gray-600">Questions</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5" />
              <span className="font-semibold">4.9/5</span>
              <span className="text-gray-600">Rating</span>
            </div>
          </div>
        </section>
      </section>

      {/* Learning Experience Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-2">
          Comprehensive Learning Experience
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Two powerful ways to master medical knowledge
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-8 border-2 border-blue-100 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mb-6">
              <Target className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-4">Adaptive Quizzes</h3>
            <p className="text-gray-600 mb-4">
              AI-powered questions that adapt to your knowledge level. Each
              completed quiz automatically generates flashcards for efficient
              review.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2">
                <CircleCheck className="w-5 h-5 mr-2 text-green-500" />
                Personalized question selection
              </li>
              <li className="flex items-center gap-2">
                <CircleCheck className="w-5 h-5 mr-2 text-green-500" />
                Detailed explanations
              </li>
              <li className="flex items-center gap-2">
                <CircleCheck className="w-5 h-5 mr-2 text-green-500" />
                Auto-generated flashcards
              </li>
            </ul>
            <Button className="w-full" href="/quiz" size="lg">
              <div className="flex items-center">
                Start Practice Quiz
                <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </Button>
          </Card>

          <Card className="p-8 border-2 border-blue-100 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mb-6">
              <Stethoscope className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-4">Clinical Cases</h3>
            <p className="text-gray-600 mb-4">
              Practice with realistic patient scenarios that develop your
              clinical reasoning skills and decision-making abilities.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2">
                <CircleCheck className="w-5 h-5 mr-2 text-green-500" />
                Real-world scenarios
              </li>
              <li className="flex items-center gap-2">
                <CircleCheck className="w-5 h-5 mr-2 text-green-500" />
                Step-by-step approach
              </li>
              <li className="flex items-center gap-2">
                <CircleCheck className="w-5 h-5 mr-2 text-green-500" />
                Expert feedback
              </li>
            </ul>
            <Button
              variant="outline"
              size="lg"
              className="w-full"
              href="/clinical-cases"
            >
              <div className="flex items-center">
                Try Clinical Cases
                <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </Button>
          </Card>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-6xl mx-auto px-4 py-16 bg-secondary/50">
        <h2 className="text-3xl font-bold text-center mb-2">
          Trusted by Leading Medical Institutions
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Join thousands of medical students preparing for their exams with
          PassMedics
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="text-yellow-500">★★★★★</span>
              </div>
              <p className="text-gray-600 italic">
                &ldquo;The adaptive quizzes and clinical cases have
                significantly improved my diagnostic reasoning. The
                auto-generated flashcards are a game-changer!&rdquo;
              </p>
              <div className="mt-4">
                <div className="font-semibold">Dr. James Mitchell</div>
                <div className="text-sm text-gray-600">
                  First Year Medical Student
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="text-yellow-500">★★★★★</span>
              </div>
              <p className="text-gray-600 italic">
                &ldquo;The clinical cases are incredibly realistic and
                challenging. They&apos;ve helped me develop a structured
                approach to patient management.&rdquo;
              </p>
              <div className="mt-4">
                <div className="font-semibold">Sarah Lee</div>
                <div className="text-sm text-gray-600">Medical Resident</div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="text-yellow-500">★★★★★</span>
              </div>
              <p className="text-gray-600 italic">
                &ldquo;The combination of quizzes and clinical cases provides a
                comprehensive learning experience. The progress tracking is
                excellent.&rdquo;
              </p>
              <div className="mt-4">
                <div className="font-semibold">Dr. Rachel Patel</div>
                <div className="text-sm text-gray-600">Recent Graduate</div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Smart Learning Features */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-2">
          Smart Learning Features
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Tools designed to optimize your study efficiency
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-6">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-primary"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 6V12L16 14M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">AI-Powered Learning</h3>
              <p className="text-gray-600">
                Questions and cases adapt to your performance level for optimal
                learning
              </p>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-primary"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Smart Flashcards</h3>
              <p className="text-gray-600">
                Automatically generated from your quiz answers for efficient
                review
              </p>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-primary"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M16 8V16M12 11V16M8 14V16M4 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V6C2 4.89543 2.89543 4 4 4Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Progress Analytics</h3>
              <p className="text-gray-600">
                Track your improvement with detailed performance insights
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <section className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Excel in Your Medical Exams?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of successful medical students who trust PassMedics
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" href="/quiz" variant={"secondary"}>
              <div className="flex items-center">
                Start Practice Quiz
                <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </Button>
            <Button
              variant="outline"
              size="lg"
              href="/clinical-cases"
              className="bg-transparent border-white text-white hover:bg-primary "
            >
              <div className="flex items-center">
                Try Clinical Cases
                <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </Button>
          </div>
          <div className="flex justify-center gap-8 mt-8 text-blue-100 text-sm">
            <div className="flex items-center gap-2">
              <CircleCheck className="w-4 h-4" />
              <span className="">
                No Credit Card Required
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              <span className="">14-Day Free Trial</span>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              <span className="">
                Student Discount Available
              </span>
            </div>
          </div>
        </section>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">© 2024 PassMedics</div>
            <div className="flex gap-4 text-sm text-gray-600">
              <a href="#" className="hover:text-primary">
                Privacy
              </a>
              <a href="#" className="hover:text-primary">
                Terms
              </a>
              <a href="#" className="hover:text-primary">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
