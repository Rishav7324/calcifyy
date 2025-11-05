import CalculatorLayout from "@/components/CalculatorLayout";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { FileText } from "lucide-react";
import { SEO } from "@/components/SEO";

const WordCounter = () => {
  const [text, setText] = useState("");
  const [stats, setStats] = useState({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0,
  });

  useEffect(() => {
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, "").length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const paragraphs = text.split(/\n\n+/).filter(p => p.trim().length > 0).length;
    const readingTime = Math.ceil(words / 200); // Average reading speed: 200 words/min

    setStats({
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      readingTime,
    });
  }, [text]);

  return (
    <>
      <SEO
        title="Word Counter - Count Words, Characters & Sentences Online"
        description="Free online word counter tool. Count words, characters, sentences, paragraphs, and estimate reading time instantly."
        keywords="word counter, character counter, text counter, word count, sentence counter, reading time calculator"
      />
      <CalculatorLayout
        title="Word Counter"
        description="Count words, characters, sentences, and estimate reading time"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="p-6">
            <Label htmlFor="text">Enter or paste your text</Label>
            <Textarea
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type or paste your text here..."
              className="min-h-[300px] mt-2"
            />
          </Card>

          <div className="grid md:grid-cols-3 gap-4">
            <Card className="p-6 result-box">
              <div className="flex items-center gap-3 mb-2">
                <FileText className="w-5 h-5 text-primary" />
                <div className="result-label">Words</div>
              </div>
              <div className="result-value">{stats.words.toLocaleString()}</div>
            </Card>

            <Card className="p-6 result-box">
              <div className="flex items-center gap-3 mb-2">
                <FileText className="w-5 h-5 text-primary" />
                <div className="result-label">Characters</div>
              </div>
              <div className="result-value">{stats.characters.toLocaleString()}</div>
            </Card>

            <Card className="p-6 result-box">
              <div className="flex items-center gap-3 mb-2">
                <FileText className="w-5 h-5 text-primary" />
                <div className="result-label">Characters (no spaces)</div>
              </div>
              <div className="result-value">{stats.charactersNoSpaces.toLocaleString()}</div>
            </Card>

            <Card className="p-6 result-box">
              <div className="flex items-center gap-3 mb-2">
                <FileText className="w-5 h-5 text-primary" />
                <div className="result-label">Sentences</div>
              </div>
              <div className="result-value">{stats.sentences.toLocaleString()}</div>
            </Card>

            <Card className="p-6 result-box">
              <div className="flex items-center gap-3 mb-2">
                <FileText className="w-5 h-5 text-primary" />
                <div className="result-label">Paragraphs</div>
              </div>
              <div className="result-value">{stats.paragraphs.toLocaleString()}</div>
            </Card>

            <Card className="p-6 result-box">
              <div className="flex items-center gap-3 mb-2">
                <FileText className="w-5 h-5 text-primary" />
                <div className="result-label">Reading Time</div>
              </div>
              <div className="result-value">{stats.readingTime} min</div>
            </Card>
          </div>
        </div>
      </CalculatorLayout>
    </>
  );
};

export default WordCounter;
