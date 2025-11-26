'use client'

export function BookDescription() {
  return (
    <section className="relative py-20 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-threshold-100">
            A Thriller That Questions Everything
          </h2>
          <p className="text-lg text-threshold-300 leading-relaxed">
            The Final Threshold is a gripping, high-stakes thriller that challenges everything 
            we know about ethics, power, and survival. In the end, the answer might be more 
            shocking than anyone could have imagined. Perfect for fans of Dan Brown, Margaret Atwood, 
            and Kazuo Ishiguro.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-accent-cyan">High-Stakes Thriller</h3>
            <p className="text-threshold-400">
              A gripping narrative that keeps you on the edge of your seat from start to finish.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-accent-cyan">Ethical Dilemmas</h3>
            <p className="text-threshold-400">
              Explores profound questions about ethics, power, and what it means to survive.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-accent-cyan">Dystopian Future</h3>
            <p className="text-threshold-400">
              A chilling vision of society that will leave you questioning the future.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
