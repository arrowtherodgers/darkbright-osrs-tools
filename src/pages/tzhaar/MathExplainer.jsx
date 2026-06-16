export default function MathExplainer() {
  return (
    <div className="bg-gray-900 rounded-xl p-6 space-y-6 text-sm text-gray-300 leading-relaxed">
      <h2 className="text-white font-semibold text-lg">How it works</h2>

      <div className="space-y-2">
        <h3 className="text-indigo-300 font-medium">The setup</h3>
        <p>
          When attacking an NPC that has non-crush defences less than it's crush
          defense, the Breaker rolls additional times for damage, and takes the
          <span className="text-white font-medium">maximum</span> of all those
          rolls — resulting in a higher expected hit.
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-indigo-300 font-medium">
          Probability of the maximum hit equalling <i>k</i>
        </h3>
        <p>
          For a roll with a max hit of <i>M</i>, the probability that{" "}
          <span className="text-white font-medium">
            all <i>w</i> rolls are ≤ <i>k</i>
          </span>{" "}
          is:
        </p>
        <div className="bg-gray-800 rounded-lg px-4 py-3 font-mono text-gray-200">
          P(all rolls ≤ k) = (k / M)^w
        </div>
        <p>
          So the probability that the maximum is{" "}
          <span className="text-white font-medium">
            exactly <i>k</i>
          </span>{" "}
          is:
        </p>
        <div className="bg-gray-800 rounded-lg px-4 py-3 font-mono text-gray-200">
          P(max = k) = (k/M)^w − ((k−1)/M)^w
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-indigo-300 font-medium">Expected value</h3>
        <p>
          Multiplying each outcome by its probability and summing over all
          possible hits gives the expected maximum:
        </p>
        <div className="bg-gray-800 rounded-lg px-4 py-3 font-mono text-gray-200">
          E[max] = Σ k · [ (k/M)^w − ((k−1)/M)^w ]
        </div>
        <p>
          where the sum runs from <i>k</i> = 1 to <i>M</i>.
        </p>
      </div>
    </div>
  );
}
