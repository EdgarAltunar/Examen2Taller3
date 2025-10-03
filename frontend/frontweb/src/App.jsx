

// Import React's useState hook for state management
import { useState } from 'react';


// Initial state for the form fields
const initialForm = {
  documento: '', // Document ID
  nombre: '',    // First name
  apellido: '',  // Last name
  correo: '',    // Email
  telefono: '',  // Phone number
};


function App() {
  // State for the form fields
  const [form, setForm] = useState(initialForm);
  // State for the list of students
  const [data, setData] = useState([]);
  // State to track which row is being edited (null if not editing)
  const [editIndex, setEditIndex] = useState(null);

  // Handle input changes in the form fields
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission for adding or updating a student
  const handleSubmit = (e) => {
    e.preventDefault();
    // Prevent adding if all fields are empty
    if (
      !form.documento.trim() &&
      !form.nombre.trim() &&
      !form.apellido.trim() &&
      !form.correo.trim() &&
      !form.telefono.trim()
    ) return;
    if (editIndex !== null) {
      // If editing, update the existing student
      const updated = [...data];
      updated[editIndex] = form;
      setData(updated);
      setEditIndex(null);
    } else {
      // If not editing, add a new student
      setData([...data, form]);
    }
    // Reset the form after submit
    setForm(initialForm);
  };

  // Load a student's data into the form for editing
  const handleEdit = (idx) => {
    setForm(data[idx]);
    setEditIndex(idx);
  };

  // Delete a student from the list
  const handleDelete = (idx) => {
    const updated = data.filter((_, i) => i !== idx);
    setData(updated);
    // If the deleted row was being edited, reset the form
    if (editIndex === idx) {
      setForm(initialForm);
      setEditIndex(null);
    }
  };

  // Cancel editing and reset the form
  const handleCancel = () => {
    setForm(initialForm);
    setEditIndex(null);
  };

  // Render the form and the table of students
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        minHeight: '100vh',
        background: '#f8f9fa',
        padding: 40,
      }}
    >
      {/* Formulario (Form) */}
      <div
        style={{
          minWidth: 350,
          maxWidth: 400,
          background: '#fff',
          border: '1px solid #ddd',
          borderRadius: 10,
          padding: 24,
          marginRight: 32,
        }}
      >
        <h2 style={{ textAlign: 'center', fontWeight: 500, marginBottom: 24 }}>
          Formulario
        </h2>
        <form autoComplete="off" onSubmit={handleSubmit}>
          {/* Document ID */}
          <div style={{ marginBottom: 16 }}>
            <label htmlFor="documento" style={{ fontWeight: 500 }}>
              Documento:
            </label>
            <br />
            <input
              type="text"
              id="documento"
              name="documento"
              value={form.documento}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: 6,
                borderRadius: 4,
                border: '1px solid #ccc',
              }}
            />
          </div>
          {/* First Name */}
          <div style={{ marginBottom: 16 }}>
            <label htmlFor="nombre" style={{ fontWeight: 500 }}>
              Nombre:
            </label>
            <br />
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: 6,
                borderRadius: 4,
                border: '1px solid #ccc',
              }}
            />
          </div>
          {/* Last Name */}
          <div style={{ marginBottom: 16 }}>
            <label htmlFor="apellido" style={{ fontWeight: 500 }}>
              Apellido:
            </label>
            <br />
            <input
              type="text"
              id="apellido"
              name="apellido"
              value={form.apellido}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: 6,
                borderRadius: 4,
                border: '1px solid #ccc',
              }}
            />
          </div>
          {/* Phone Number */}
          <div style={{ marginBottom: 16 }}>
            <label htmlFor="telefono" style={{ fontWeight: 500 }}>
              Teléfono:
            </label>
            <br />
            <input
              type="text"
              id="telefono"
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: 6,
                borderRadius: 4,
                border: '1px solid #ccc',
              }}
            />
          </div>
          {/* Email */}
          <div style={{ marginBottom: 24 }}>
            <label htmlFor="correo" style={{ fontWeight: 500 }}>
              Correo:
            </label>
            <br />
            <input
              type="email"
              id="correo"
              name="correo"
              value={form.correo}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: 6,
                borderRadius: 4,
                border: '1px solid #ccc',
              }}
            />
          </div>
          {/* Submit and Cancel buttons */}
          <button
            type="submit"
            style={{
              width: '100%',
              background: '#206a36',
              color: '#fff',
              fontWeight: 600,
              fontSize: 17,
              border: 'none',
              borderRadius: 5,
              padding: '10px 0',
              marginBottom: 10,
              cursor: 'pointer',
            }}
          >
            {editIndex !== null ? 'Actualizar' : 'Registrar'}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            style={{
              width: '100%',
              background: '#6ec1e4',
              color: '#fff',
              fontWeight: 600,
              fontSize: 17,
              border: 'none',
              borderRadius: 5,
              padding: '10px 0',
              cursor: 'pointer',
            }}
          >
            Cancelar
          </button>
        </form>
      </div>
      {/* Lista de estudiantes (Student List) */}
      <div
        style={{
          flex: 1,
          minWidth: 400,
          background: '#fff',
          border: '1px solid #ddd',
          borderRadius: 10,
          padding: 24,
        }}
      >
        <h2 style={{ textAlign: 'center', fontWeight: 500, marginBottom: 24 }}>
          Lista de estudiantes
        </h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 16 }}>
            <thead>
              <tr style={{ background: '#f2f2f2' }}>
                <th style={{ padding: 8, border: '1px solid #eee', fontWeight: 600 }}>
                  Documento
                </th>
                <th style={{ padding: 8, border: '1px solid #eee', fontWeight: 600 }}>
                  Nombre
                </th>
                <th style={{ padding: 8, border: '1px solid #eee', fontWeight: 600 }}>
                  Apellido
                </th>
                <th style={{ padding: 8, border: '1px solid #eee', fontWeight: 600 }}>
                  Correo
                </th>
                <th style={{ padding: 8, border: '1px solid #eee', fontWeight: 600 }}>
                  Teléfono
                </th>
                <th style={{ padding: 8, border: '1px solid #eee', fontWeight: 600 }}></th>
              </tr>
            </thead>
            <tbody>
              {/* Show message if no students are registered */}
              {data.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', color: '#888', padding: 16 }}>
                    No hay estudiantes registrados.
                  </td>
                </tr>
              )}
              {/* Render each student row */}
              {data.map((item, idx) => (
                <tr key={idx}>
                  <td style={{ padding: 8, border: '1px solid #eee', fontWeight: 600 }}>{item.documento}</td>
                  <td style={{ padding: 8, border: '1px solid #eee' }}>{item.nombre}</td>
                  <td style={{ padding: 8, border: '1px solid #eee' }}>{item.apellido}</td>
                  <td style={{ padding: 8, border: '1px solid #eee' }}>{item.correo}</td>
                  <td style={{ padding: 8, border: '1px solid #eee' }}>{item.telefono}</td>
                  <td style={{ padding: 8, border: '1px solid #eee', textAlign: 'right' }}>
                    {/* Edit button loads the row into the form */}
                    <button
                      type="button"
                      onClick={() => handleEdit(idx)}
                      style={{
                        background: '#6ec1e4',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 5,
                        padding: '6px 16px',
                        marginRight: 6,
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      Editar
                    </button>
                    {/* Delete button removes the row */}
                    <button
                      type="button"
                      onClick={() => handleDelete(idx)}
                      style={{
                        background: '#dc3545',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 5,
                        padding: '6px 16px',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
