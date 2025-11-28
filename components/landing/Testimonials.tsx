import { Star } from 'lucide-react'

const testimonials = [
  {
    text: "Couldn't put it down. The ethical dilemmas kept me up all night.",
    author: "Sarah M.",
    rating: 5,
  },
  {
    text: "Perfect blend of Dan Brown's pacing and Atwood's depth.",
    author: "Michael R.",
    rating: 5,
  },
  {
    text: "A thriller that makes you question everything. Absolutely gripping.",
    author: "Jennifer L.",
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          What Readers Are Saying
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-threshold-700 rounded-lg p-6 border border-threshold-600"
            >
              <div className="flex gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent-cyan text-accent-cyan" />
                ))}
              </div>
              
              <p className="text-threshold-200 mb-4 italic">
                "{testimonial.text}"
              </p>
              
              <p className="text-threshold-400 text-sm">
                — {testimonial.author}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
