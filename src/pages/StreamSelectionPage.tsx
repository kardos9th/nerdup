import { useParams, Link, useNavigate } from "react-router-dom";
import { GraduationCap, BookOpen, FlaskConical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { curriculum } from "@/data/curriculum";

const StreamSelectionPage = () => {
  const { gradeId } = useParams();
  const navigate = useNavigate();
  
  const grade = curriculum.find(g => g.id === parseInt(gradeId || "10"));

  if (!grade || !grade.hasStreams || !grade.streams) {
    navigate(`/grade/${gradeId}`);
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        {/* Header */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-12 border-b">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4">
                <Link to="/" className="hover:text-primary">الرئيسية</Link>
                <span>/</span>
                <span>{grade.name}</span>
              </div>
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="h-10 w-10 text-primary" />
              </div>
              <h1 className="text-4xl font-bold mb-3">{grade.name}</h1>
              <p className="text-lg text-muted-foreground">
                اختر الشعبة الدراسية
              </p>
            </div>
          </div>
        </section>

        {/* Stream Selection */}
        <section className="py-16 container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {grade.streams.map((stream) => (
              <Link key={stream.id} to={`/grade/${gradeId}/stream/${stream.id}`}>
                <Card className="hover:shadow-lg transition-all cursor-pointer h-full border-2 hover:border-primary">
                  <CardContent className="p-8 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                      {stream.id.includes("scientific") ? (
                        <FlaskConical className="h-8 w-8 text-primary" />
                      ) : (
                        <BookOpen className="h-8 w-8 text-primary" />
                      )}
                    </div>
                    <h3 className="text-2xl font-semibold">{stream.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {stream.subjects.filter(s => s.countsTowardsTotal).length} مادة أساسية
                    </p>
                    <Button className="w-full">استعرض المواد</Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default StreamSelectionPage;
