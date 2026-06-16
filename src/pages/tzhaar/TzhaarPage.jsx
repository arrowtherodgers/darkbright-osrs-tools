import Calculator from "./Calculator";
import MathExplainer from "./MathExplainer";

export default function TzhaarPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">TzHaar-Ket-Breaker</h1>
        <p className="text-gray-400 mt-1">
          Expected hit calculator for monsters with multiple weaknesses.
        </p>
      </div>
      <Calculator />
      <MathExplainer />
    </div>
  );
}
