"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion, AnimatePresence } from "framer-motion"
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card"
import { XMarkIcon, PlusIcon } from "@heroicons/react/24/outline"

interface Course {
  grade: string
  credits: number
}

export function GPACalculator() {
  const [previousGPA, setPreviousGPA] = useState<string>("")
  const [previousHours, setPreviousHours] = useState<string>("")
  const [courses, setCourses] = useState<Course[]>([{ grade: "", credits: 3 }])
  const [cumulativeGPA, setCumulativeGPA] = useState<number | null>(null)
  const [semesterGPA, setSemesterGPA] = useState<number | null>(null)
  const [totalHours, setTotalHours] = useState<number>(0)
  const [calculating, setCalculating] = useState(false)

  const gradePoints: { [key: string]: number } = {
    "A": 4.0,   // 90 & Above
    "B+": 3.5,  // 82-89
    "B": 3.0,   // 74-81
    "C+": 2.5,  // 66-73
    "C": 2.0,   // 58-65
    "D": 1.0,   // 50-57
    "F": 0.0,   // Below 50
  }

  const gradeRanges: { [key: string]: string } = {
    "A": "90 & Above",
    "B+": "82-89",
    "B": "74-81",
    "C+": "66-73",
    "C": "58-65",
    "D": "50-57",
    "F": "Below 50",
  }

  const addCourse = () => {
    setCourses([...courses, { grade: "", credits: 3 }])
  }

  const removeCourse = (index: number) => {
    setCourses(courses.filter((_, i) => i !== index))
  }

  const updateCourse = (index: number, field: keyof Course, value: string | number) => {
    const newCourses = [...courses]
    newCourses[index] = { ...newCourses[index], [field]: value }
    setCourses(newCourses)
  }

  const clearAll = () => {
    setPreviousGPA("")
    setPreviousHours("")
    setCourses([{ grade: "", credits: 3 }])
    setCumulativeGPA(null)
    setSemesterGPA(null)
    setTotalHours(0)
  }

  const calculateGPA = () => {
    setCalculating(true)
    let semesterPoints = 0
    let semesterCredits = 0

    courses.forEach(course => {
      if (course.grade && course.credits) {
        semesterPoints += course.credits * gradePoints[course.grade]
        semesterCredits += course.credits
      }
    })

    const currentSemesterGPA = semesterCredits === 0 ? 0 : semesterPoints / semesterCredits
    setSemesterGPA(currentSemesterGPA)

    if (previousGPA && previousHours) {
      const prevPoints = parseFloat(previousGPA) * parseFloat(previousHours)
      const totalPoints = prevPoints + semesterPoints
      const totalCredits = parseFloat(previousHours) + semesterCredits
      const finalGPA = totalPoints / totalCredits
      setCumulativeGPA(finalGPA)
      setTotalHours(totalCredits)
    } else {
      setCumulativeGPA(currentSemesterGPA)
      setTotalHours(semesterCredits)
    }

    // Add a small delay for the animation
    setTimeout(() => setCalculating(false), 600)
  }

  return (
    <div className="container mx-auto p-4 backdrop-blur-sm">
      <CardContainer className="inter-var">
        <CardBody className="relative w-auto sm:w-[90%] max-w-4xl h-auto rounded-xl p-6 border bg-background/80 dark:bg-background/80 dark:border-white/[0.2] border-black/[0.1]">
          <CardItem
            translateZ="50"
            className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60 mb-6"
          >
            GPA Calculator
          </CardItem>

          {/* Previous GPA and Hours */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-[22px] p-4 bg-card hover:shadow-lg transition-all duration-300 border border-border/50">
              <Label className="text-sm font-medium text-foreground/90">Previous GPA / المعدل السابق</Label>
              <Input
                type="number"
                value={previousGPA}
                onChange={(e) => setPreviousGPA(e.target.value)}
                step="0.01"
                min="0"
                max="4"
                className="mt-2 transition-all duration-300 hover:border-primary/50 focus:border-primary"
                placeholder="Enter previous GPA"
              />
            </div>
            <div className="rounded-[22px] p-4 bg-card hover:shadow-lg transition-all duration-300 border border-border/50">
              <Label className="text-sm font-medium text-foreground/90">Previous Hours / الساعات السابقة</Label>
              <Input
                type="number"
                value={previousHours}
                onChange={(e) => setPreviousHours(e.target.value)}
                min="0"
                className="mt-2 transition-all duration-300 hover:border-primary/50 focus:border-primary"
                placeholder="Enter previous hours"
              />
            </div>
          </div>

          {/* Course List */}
          <div className="mt-6 space-y-4">
            <AnimatePresence mode="popLayout">
              {courses.map((course, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, type: "spring", stiffness: 100 }}
                  className="group"
                  layout
                >
                  <div className="rounded-[22px] p-4 bg-card hover:shadow-lg transition-all duration-300 border border-border/50">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                      <div>
                        <Label className="text-sm font-medium text-foreground/90">Grade</Label>
                        <Select
                          value={course.grade}
                          onValueChange={(value) => updateCourse(index, "grade", value)}
                        >
                          <SelectTrigger className="mt-2 transition-all duration-300 hover:border-primary/50 focus:border-primary">
                            <SelectValue placeholder="Select Grade" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(gradePoints).map(([grade]) => (
                              <SelectItem key={grade} value={grade}>
                                {grade} ({gradeRanges[grade]})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-foreground/90">Credit Hours</Label>
                        <Select
                          value={course.credits.toString()}
                          onValueChange={(value) => updateCourse(index, "credits", parseInt(value))}
                        >
                          <SelectTrigger className="mt-2 transition-all duration-300 hover:border-primary/50 focus:border-primary">
                            <SelectValue placeholder="Select Credits" />
                          </SelectTrigger>
                          <SelectContent>
                            {[2, 3, 4, 6].map((credit) => (
                              <SelectItem key={credit} value={credit.toString()}>
                                {credit}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-10 w-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        onClick={() => removeCourse(index)}
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Actions */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              onClick={addCourse}
              className="flex items-center gap-2 hover:bg-primary/10 transition-colors duration-300"
            >
              <PlusIcon className="h-5 w-5" />
              Add Subject
            </Button>
            <Button
              onClick={calculateGPA}
              disabled={calculating}
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300"
            >
              {calculating ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  <span>Calculating...</span>
                </div>
              ) : (
                "Calculate"
              )}
            </Button>
            <Button
              variant="secondary"
              onClick={clearAll}
              className="hover:bg-secondary/80 transition-colors duration-300"
            >
              Clear All
            </Button>
          </div>

          {/* Results */}
          <AnimatePresence mode="wait">
            {(semesterGPA !== null || cumulativeGPA !== null) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 100 }}
                className="mt-8"
              >
                <div className="rounded-[22px] p-6 bg-card hover:shadow-lg transition-all duration-300 border border-border/50">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <motion.div 
                      className="text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <h3 className="text-sm font-medium mb-1 text-foreground/70">Semester GPA</h3>
                      <p className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 text-transparent bg-clip-text">
                        {semesterGPA?.toFixed(2) || "0.00"}
                      </p>
                    </motion.div>
                    <motion.div 
                      className="text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h3 className="text-sm font-medium mb-1 text-foreground/70">Cumulative GPA</h3>
                      <p className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 text-transparent bg-clip-text">
                        {cumulativeGPA?.toFixed(2) || "0.00"}
                      </p>
                    </motion.div>
                    <motion.div 
                      className="text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h3 className="text-sm font-medium mb-1 text-foreground/70">Total Credit Hours</h3>
                      <p className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 text-transparent bg-clip-text">
                        {totalHours}
                      </p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Grade Scale Reference */}
          <motion.div className="mt-8">
            <div className="rounded-[22px] p-6 bg-card hover:shadow-lg transition-all duration-300 border border-border/50">
              <h3 className="text-lg font-medium mb-4 text-foreground/90">Grade Scale Reference</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
                {Object.entries(gradePoints).map(([grade, points], index) => (
                  <motion.div
                    key={grade}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="text-center p-3 bg-gradient-to-br from-muted/50 to-muted rounded-lg hover:shadow-md transition-all duration-300"
                  >
                    <div className="text-lg font-medium text-primary">{grade}</div>
                    <div className="text-sm text-primary/80">{points.toFixed(1)}</div>
                    <div className="text-xs text-foreground/60 mt-1">{gradeRanges[grade]}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </CardBody>
      </CardContainer>
    </div>
  )
}
