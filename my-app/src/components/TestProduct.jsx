import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function TestProduct() {

  const BaseUrl = 'http://127.0.0.1:5000'
  
  const [product, setProduct] = useState([])
  const [loading, setLoading] = useState(true)     // ⬅ for fetch
  const [sending, setSending] = useState(false)    // ⬅ for submit

  const [form, setForm] = useState({
    name: '',
    description: '',
    stars: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const onSend = async (e) => {
    e.preventDefault()
    setSending(true)

    setTimeout(async () => {
      try {
        const res = await axios.post(`${BaseUrl}/product`, form)
        setForm({ name: '', description: '', stars: '' })
        setProduct(prev => [...prev, res.data])
      } catch (err) {
        console.error(err)
      } finally {
        setSending(false)
      }
    }, 1000)
  }

  const fetchProduct = async () => {
    setLoading(true)

    setTimeout(async () => {
      try {
        const res = await axios.get(`${BaseUrl}/product`)
        setProduct(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }, 1000)
  }

  useEffect(() => {
    fetchProduct()
  }, [])

  const updateStars = (id, stars) => {
    axios.put(`${BaseUrl}/product/${id}/rating`, { stars })
      .then(() => {
        setProduct(prev =>
          prev.map(p => p.id === id ? { ...p, stars } : p)
        )
      })
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Add Product</h1>

      <form onSubmit={onSend}>
        <input
          type="text"
          name="name"
          placeholder="Product name"
          value={form.name}
          onChange={handleChange}
        /><br /><br />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        /><br /><br />

        <input
          type="number"
          name="stars"
          placeholder="Stars (1–5)"
          value={form.stars}
          onChange={handleChange}
        /><br /><br />

        <button type="submit" disabled={sending}>
          {sending ? "Submitting..." : "Submit"}
        </button>
      </form>

      {sending && (
        <div className="spinner">⏳ Sending...</div>
      )}

      <hr />

      <h2>Products</h2>

      {loading ? (
        <div className="spinner">⏳ Loading products...</div>
      ) : (
        product.map(p => (
          <div key={p.id} style={{ marginBottom: 20 }}>
            <h3>{p.name}</h3>
            <p>{p.description}</p>

            {[1, 2, 3, 4, 5].map(star => (
              <span
                key={star}
                onClick={() => updateStars(p.id, star)}
                style={{
                  cursor: "pointer",
                  fontSize: "24px",
                  color: p.stars >= star ? "gold" : "gray"
                }}
              >
                ★
              </span>
            ))}
          </div>
        ))
      )}

      {/* Simple Spinner CSS */}
      <style>{`
        .spinner {
          font-size: 18px;
          padding: 10px 0;
          color: #555;
        }
      `}</style>
    </div>
  )
}
