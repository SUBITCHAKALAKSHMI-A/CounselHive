import { Carousel } from 'react-bootstrap'

const TestimonialCarousel = () => {
  const testimonials = [
    {
      id: 1,
      name: "Karthik R.",
      college: "Anna University, Chennai",
      quote: "This platform helped me find the perfect college based on my cutoff marks. I'm now pursuing my dream course!"
    },
    {
      id: 2,
      name: "Priya M.",
      college: "PSG Tech, Coimbatore",
      quote: "The district-wise college search made it so easy to compare options near my hometown."
    },
    {
      id: 3,
      name: "Arun S.",
      college: "NIT Trichy",
      quote: "The predictor was accurate and saved me weeks of research time. Highly recommended!"
    }
  ]

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-5">What Students Say</h2>
        
        <Carousel indicators={false} className="testimonial-carousel">
          {testimonials.map(testimonial => (
            <Carousel.Item key={testimonial.id}>
              <div className="row justify-content-center">
                <div className="col-lg-8 text-center">
                  <blockquote className="blockquote">
                    <p className="mb-4 fs-4 fst-italic">"{testimonial.quote}"</p>
                    <footer className="blockquote-footer mt-3">
                      <strong>{testimonial.name}</strong>, {testimonial.college}
                    </footer>
                  </blockquote>
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </section>
  )
}

export default TestimonialCarousel