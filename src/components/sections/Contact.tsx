'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import { Input, Textarea } from '@/components/ui/Input'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic would go here
    console.log('Form submitted:', formData)
    // Reset form
    setFormData({ name: '', email: '', projectType: '', message: '' })
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <section className="relative py-32 md:py-48 lg:py-64">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 neon-glow-blue">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto">
            Let's discuss your project and bring your vision to life
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Name"
                name="name"
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Input
                label="Email"
                name="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Project Type
              </label>
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                className="w-full px-4 py-3 glass rounded-lg text-white placeholder:text-white/40 border border-white/10 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/50 transition-all duration-300 bg-transparent"
              >
                <option value="" className="bg-dark">Select a project type</option>
                <option value="web-design" className="bg-dark">Web Design</option>
                <option value="development" className="bg-dark">Development</option>
                <option value="branding" className="bg-dark">Branding</option>
                <option value="ai-automation" className="bg-dark">AI Automation</option>
                <option value="other" className="bg-dark">Other</option>
              </select>
            </div>

            <Textarea
              label="Message"
              name="message"
              placeholder="Tell us about your project..."
              rows={6}
              value={formData.message}
              onChange={handleChange}
              required
            />

            <div className="flex justify-center">
              <Button type="submit" variant="primary" size="lg">
                Send Message
              </Button>
            </div>
          </form>
        </motion.div>
      </Container>
    </section>
  )
}

