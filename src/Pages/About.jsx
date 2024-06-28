import React from 'react';

function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-[#eb2540]">About Our Store</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
        <p className="text-gray-700 mb-4">
          Founded in 2023, our e-commerce store began with a simple mission: to provide high-quality clothing at affordable prices. What started as a small online boutique has grown into a thriving marketplace, serving customers across the country.
        </p>
        <p className="text-gray-700 mb-4">
          We believe that everyone deserves to look and feel their best, without breaking the bank. That's why we work tirelessly to bring you the latest fashion trends and timeless classics, all at prices that won't leave your wallet empty.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Commitment</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li className="mb-2">Quality: We source only the best materials and partner with reputable manufacturers.</li>
          <li className="mb-2">Affordability: Our direct-to-consumer model allows us to offer premium products at competitive prices.</li>
          <li className="mb-2">Customer Satisfaction: Your happiness is our top priority. We offer hassle-free returns and dedicated customer support.</li>
          <li className="mb-2">Sustainability: We're committed to reducing our environmental impact through eco-friendly practices and packaging.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p className="text-gray-700 mb-2">
          We'd love to hear from you! Reach out to us at:
        </p>
        <p className="text-gray-700 mb-2">Email: support@ourstore.com</p>
        <p className="text-gray-700 mb-2">Phone: (123) 456-7890</p>
        <p className="text-gray-700">
          Address: 123 Fashion Street, Styleville, ST 12345
        </p>
      </section>
    </div>
  );
}

export default About;