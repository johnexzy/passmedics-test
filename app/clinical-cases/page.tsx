"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { clinicalCases } from "@/data/clinical-cases";
import Header from "@/components/Header";

export default function ClinicalCasesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Clinical Case Simulator</h1>
          <p className="text-gray-600">
            Practice real-world medical scenarios and decision making
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card className="p-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-1">Real Patient Cases</h2>
              <p className="text-gray-600">Practice with realistic scenarios based on actual clinical cases</p>
            </div>
          </Card>

          <Card className="p-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-1">Clinical Decision Making</h2>
              <p className="text-gray-600">Develop critical thinking and diagnostic reasoning skills</p>
            </div>
          </Card>

          <Card className="p-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-1">Time Management</h2>
              <p className="text-gray-600">Practice making quick decisions under time pressure</p>
            </div>
          </Card>

          <Card className="p-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-1">Detailed Feedback</h2>
              <p className="text-gray-600">Get comprehensive feedback on your clinical decisions</p>
            </div>
          </Card>
        </div>

        {/* Available Cases */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Available Cases</h2>
          <div className="space-y-4">
            {clinicalCases.map((caseItem) => (
              <div key={caseItem.id} className="flex items-center justify-between p-4 bg-card rounded-lg border">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold">{caseItem.title}</h3>
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                      {caseItem.category}
                    </span>
                    <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                      {caseItem.difficulty}
                    </span>
                  </div>
                  <p className="text-gray-600">{caseItem.description}</p>
                </div>
                <Button href={`/clinical-cases/${caseItem.id}`}>Start Case</Button>
              </div>
            ))}
          </div>
        </div>

        {/* Want to Test Your Knowledge */}
        <div className="text-center py-12 border-t">
          <h2 className="text-2xl font-bold mb-4">Want to Test Your Knowledge?</h2>
          <p className="text-gray-600 mb-8">
            Take our medical quiz to quickly assess your understanding across various topics.
          </p>
          <Button href="/quiz" variant="outline" size="lg">
            Take a Quiz
          </Button>
        </div>
      </main>
    </div>
  );
} 