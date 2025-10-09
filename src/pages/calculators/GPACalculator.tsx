import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CalculatorLayout from "@/components/CalculatorLayout";

interface Course {
  grade: string;
  credits: number;
}

const GPACalculator = () => {
  const [courses, setCourses] = useState<Course[]>([{ grade: "", credits: 0 }]);
  const [gpa, setGpa] = useState<number | null>(null);

  const gradePoints: { [key: string]: number } = {
    "A+": 4.0, "A": 4.0, "A-": 3.7,
    "B+": 3.3, "B": 3.0, "B-": 2.7,
    "C+": 2.3, "C": 2.0, "C-": 1.7,
    "D+": 1.3, "D": 1.0, "F": 0.0
  };

  const addCourse = () => {
    setCourses([...courses, { grade: "", credits: 0 }]);
  };

  const updateCourse = (index: number, field: keyof Course, value: string | number) => {
    const updated = [...courses];
    if (field === "grade") {
      updated[index].grade = value as string;
    } else {
      updated[index].credits = value as number;
    }
    setCourses(updated);
  };

  const calculate = () => {
    let totalPoints = 0;
    let totalCredits = 0;
    courses.forEach(course => {
      if (course.grade && course.credits > 0) {
        totalPoints += gradePoints[course.grade] * course.credits;
        totalCredits += course.credits;
      }
    });
    setGpa(totalCredits > 0 ? totalPoints / totalCredits : 0);
  };

  return (
    <CalculatorLayout
      title="GPA Calculator"
      description="Calculate your Grade Point Average based on grades and credit hours"
      formula="GPA = (Sum of Grade Points × Credits) ÷ Total Credits"
      explanation="GPA is calculated by multiplying each grade's point value by the credit hours, summing these values, and dividing by total credit hours."
    >
      <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
        <div className="space-y-4">
          {courses.map((course, index) => (
            <div key={index} className="grid grid-cols-2 gap-4 p-4 bg-secondary/10 rounded">
              <div>
                <Label>Grade</Label>
                <Select onValueChange={(value) => updateCourse(index, "grade", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(gradePoints).map(grade => (
                      <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Credits</Label>
                <Input
                  type="number"
                  value={course.credits || ""}
                  onChange={(e) => updateCourse(index, "credits", parseFloat(e.target.value))}
                  placeholder="Credit hours"
                />
              </div>
            </div>
          ))}
          <Button onClick={addCourse} variant="outline" className="w-full">Add Course</Button>
          <Button onClick={calculate} className="w-full">Calculate GPA</Button>
          {gpa !== null && (
            <div className="mt-6 p-4 bg-primary/10 rounded-lg">
              <p className="text-3xl font-bold text-primary">GPA: {gpa.toFixed(2)}</p>
            </div>
          )}
        </div>
      </Card>
    </CalculatorLayout>
  );
};

export default GPACalculator;
