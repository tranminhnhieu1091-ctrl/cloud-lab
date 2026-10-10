import { useState, useEffect } from "react";

function App() {
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editingId, setEditingId] = useState(null);

  const API_URL = "https://mern-backend-236983.onrender.com/api/students";

  const fetchStudents = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error("Lỗi tải danh sách:", err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Cập nhật (PUT)
        const res = await fetch(`${API_URL}/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ studentId, name, email }),
        });
        if (res.ok) {
          cancelEdit();
          fetchStudents();
        }
      } else {
        // Thêm mới (POST)
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ studentId, name, email }),
        });
        if (res.ok) {
          setStudentId("");
          setName("");
          setEmail("");
          fetchStudents();
        }
      }
    } catch (err) {
      console.error("Lỗi xử lý:", err);
    }
  };

  const handleEdit = (st) => {
    setEditingId(st._id);
    setStudentId(st.studentId);
    setName(st.name);
    setEmail(st.email);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setStudentId("");
    setName("");
    setEmail("");
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sinh viên này?")) {
      try {
        const res = await fetch(`${API_URL}/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          fetchStudents();
        }
      } catch (err) {
        console.error("Lỗi xóa sinh viên:", err);
      }
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
        padding: "40px 20px",
        fontFamily: "Segoe UI, Roboto, Helvetica, Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          boxShadow:
            "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
          padding: "32px",
        }}
      >
        <h1
          style={{
            fontSize: "24px",
            fontWeight: "700",
            color: "#1f2937",
            marginBottom: "28px",
            textAlign: "center",
          }}
        >
          Quản Lý Sinh Viên Phiên bản 2.0
        </h1>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(180px, 1fr)) auto auto",
            gap: "12px",
            marginBottom: "32px",
            alignItems: "center",
          }}
        >
          <input
            placeholder="Mã số sinh viên"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
            style={{
              padding: "10px 14px",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              outline: "none",
              fontSize: "14px",
            }}
          />
          <input
            placeholder="Họ và tên"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{
              padding: "10px 14px",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              outline: "none",
              fontSize: "14px",
            }}
          />
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: "10px 14px",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              outline: "none",
              fontSize: "14px",
            }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: editingId ? "#10b981" : "#2563eb",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              padding: "10px 20px",
              fontWeight: "600",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            {editingId ? "Cập nhật" : "Thêm mới"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              style={{
                backgroundColor: "#6b7280",
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                padding: "10px 16px",
                fontWeight: "600",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              Hủy
            </button>
          )}
        </form>

        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "left",
              fontSize: "14px",
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: "#f9fafb",
                  color: "#4b5563",
                  borderBottom: "2px solid #e5e7eb",
                }}
              >
                <th style={{ padding: "12px 16px", fontWeight: "600" }}>STT</th>
                <th style={{ padding: "12px 16px", fontWeight: "600" }}>
                  MSSV
                </th>
                <th style={{ padding: "12px 16px", fontWeight: "600" }}>
                  Họ và tên
                </th>
                <th style={{ padding: "12px 16px", fontWeight: "600" }}>
                  Email
                </th>
                <th
                  style={{
                    padding: "12px 16px",
                    fontWeight: "600",
                    textAlign: "center",
                  }}
                >
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              {students.length > 0 ? (
                students.map((st, index) => (
                  <tr
                    key={st._id}
                    style={{
                      borderBottom: "1px solid #e5e7eb",
                      backgroundColor: index % 2 === 0 ? "#ffffff" : "#f9fafb",
                    }}
                  >
                    <td style={{ padding: "12px 16px", color: "#6b7280" }}>
                      {index + 1}
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        fontWeight: "600",
                        color: "#111827",
                      }}
                    >
                      {st.studentId}
                    </td>
                    <td style={{ padding: "12px 16px", color: "#374151" }}>
                      {st.name}
                    </td>
                    <td style={{ padding: "12px 16px", color: "#2563eb" }}>
                      {st.email}
                    </td>
                    <td style={{ padding: "12px 16px", textAlign: "center" }}>
                      <button
                        onClick={() => handleEdit(st)}
                        style={{
                          backgroundColor: "#f59e0b",
                          color: "#ffffff",
                          border: "none",
                          borderRadius: "6px",
                          padding: "6px 12px",
                          fontSize: "12px",
                          fontWeight: "600",
                          cursor: "pointer",
                          marginRight: "8px",
                        }}
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(st._id)}
                        style={{
                          backgroundColor: "#ef4444",
                          color: "#ffffff",
                          border: "none",
                          borderRadius: "6px",
                          padding: "6px 12px",
                          fontSize: "12px",
                          fontWeight: "600",
                          cursor: "pointer",
                        }}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    style={{
                      padding: "24px 16px",
                      textAlign: "center",
                      color: "#9ca3af",
                    }}
                  >
                    Chưa có dữ liệu sinh viên
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
