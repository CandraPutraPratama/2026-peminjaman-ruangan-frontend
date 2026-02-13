import { useEffect, useState, useCallback } from "react";
import { getRooms, deleteRoom } from "../services/roomService";
import { getMyBookings } from "../services/bookingService";
import Navbar from "../components/Navbar";
import BookingModal from "../components/BookingModal";
import AddRoomModal from "../components/AddRoomModal";

const DashboardPage = () => {
  const [rooms, setRooms] = useState<any[]>([]);
  const [allBookings, setAllBookings] = useState<any[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const userRole = localStorage.getItem("role"); // Ambil kasta user

  const loadData = useCallback(async () => {
    try {
      const roomRes = await getRooms();
      const bookingRes = await getMyBookings();
      setRooms(roomRes.data);
      setAllBookings(bookingRes.data);
    } catch (error) {
      console.error("Gagal memuat data!", error);
    }
  }, []);

  useEffect(() => {
    loadData();
    const interval = setInterval(() => {
      setRooms((prev) => [...prev]);
    }, 1000);
    return () => clearInterval(interval);
  }, [loadData]);

  const getRoomStatus = (roomId: number) => {
    const now = new Date();
    const activeBooking = allBookings.find(
      (b) =>
        b.roomId === roomId &&
        now >= new Date(b.startTime) &&
        now <= new Date(b.endTime),
    );

    if (activeBooking) {
      const end = new Date(activeBooking.endTime);
      const diff = Math.max(
        0,
        Math.floor((end.getTime() - now.getTime()) / 60000),
      );
      return { isBooked: true, remaining: diff };
    }
    return { isBooked: false, remaining: 0 };
  };

  const handleDeleteRoom = async (id: number, name: string) => {
    if (
      window.confirm(
        `Yakin mau hapus ${name}? Semua riwayat bokingan bakal ikut hilang!`,
      )
    ) {
      try {
        await deleteRoom(id);
        alert("Ruangan berhasil dihapus!");
        loadData();
      } catch (error) {
        alert("Gagal menghapus ruangan, coba lagi.");
      }
    }
  };

  const bookedCount = rooms.filter((r) => getRoomStatus(r.id).isBooked).length;
  const availableCount = rooms.length - bookedCount;

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <Navbar />
      <div className="p-8 max-w-7xl mx-auto">
        <header className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">
              Daftar Ruangan
            </h2>
            <p className="text-gray-500 font-medium mt-1">
              Sistem booking ruangan ter-update secara real-time.
            </p>
          </div>
          {userRole === "Admin" && (
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-gray-900 text-white px-8 py-3 rounded-2xl font-bold hover:bg-blue-600 shadow-xl transition-all"
            >
              + Tambah Ruangan
            </button>
          )}
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-bold text-xs uppercase">
              Unit
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Total
              </p>
              <h4 className="text-2xl font-black text-gray-800">
                {rooms.length}
              </h4>
            </div>
          </div>
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-4 border-l-4 border-l-red-500">
            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-500">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Terisi
              </p>
              <h4 className="text-2xl font-black text-gray-800">
                {bookedCount}
              </h4>
            </div>
          </div>
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-4 border-l-4 border-l-green-500">
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Tersedia
              </p>
              <h4 className="text-2xl font-black text-gray-800">
                {availableCount}
              </h4>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room) => {
            const status = getRoomStatus(room.id);

            return (
              <div
                key={room.id}
                className="group bg-white p-4 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner ${status.isBooked ? "bg-red-50 text-red-500" : "bg-blue-50 text-blue-600"}`}
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        ></path>
                      </svg>
                    </div>
                    <span className="bg-gray-100 text-gray-400 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                      ID: {room.id}
                    </span>
                  </div>

                  <h3 className="text-2xl font-extrabold text-gray-800 mb-1">
                    {room.name}
                  </h3>
                  <p className="text-gray-400 text-sm font-semibold mb-6 flex items-center gap-2">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${status.isBooked ? "bg-red-500 animate-pulse" : "bg-green-500"}`}
                    ></span>
                    <span
                      className={
                        status.isBooked ? "text-red-500" : "text-green-600"
                      }
                    >
                      {status.isBooked ? "TERISI" : "TERSEDIA"}
                    </span>
                    <span className="mx-1 opacity-20">|</span>
                    Kapasitas:{" "}
                    <span className="text-gray-700 font-bold">
                      {room.capacity} Orang
                    </span>
                  </p>

                  {status.isBooked && (
                    <div className="bg-red-50 p-3 rounded-xl border border-red-100 mb-6">
                      <p className="text-[10px] font-black text-red-400 uppercase tracking-tighter mb-1">
                        Status Penggunaan
                      </p>
                      <p className="text-xs font-bold text-red-600">
                        Berakhir dalam:{" "}
                        <span className="text-sm font-black">
                          {status.remaining} Menit lagi
                        </span>
                      </p>
                    </div>
                  )}
                </div>

                <div className="p-2 space-y-3">
                  <button
                    onClick={() => setSelectedRoom(room)}
                    disabled={status.isBooked}
                    className={`w-full py-4 rounded-[1.5rem] font-bold shadow-lg transition-all active:scale-95 ${status.isBooked ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-100"}`}
                  >
                    {status.isBooked
                      ? "Ruangan Sedang Digunakan"
                      : "Pesan Sekarang"}
                  </button>

                  {userRole === "Admin" && (
                    <button
                      onClick={() => handleDeleteRoom(room.id, room.name)}
                      className="w-full bg-white text-red-400 hover:text-red-600 py-2 rounded-xl text-xs font-bold transition-colors opacity-50 hover:opacity-100 tracking-widest uppercase"
                    >
                      Hapus Ruangan
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {selectedRoom && (
        <BookingModal
          room={selectedRoom}
          onClose={() => {
            setSelectedRoom(null);
            loadData();
          }}
        />
      )}
      {showAddModal && (
        <AddRoomModal
          onClose={() => setShowAddModal(false)}
          onRefresh={loadData}
        />
      )}
    </div>
  );
};

export default DashboardPage;
