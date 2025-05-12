const questions = [
  {
    title: "Một cộng một bằng bao nhiêu?",
    image:
      "https://th.bing.com/th/id/R.52f03ae375de602739fd456a55a3b5fb?rik=CFotL%2bB31YHTkQ&pid=ImgRaw&r=0",
    answer: ["1", "2", "3", "4"],
    correctAnswer: "2",
  },
  {
    title: "Thủ đô của Việt Nam là gì?",
    image:
      "https://th.bing.com/th/id/R.52f03ae375de602739fd456a55a3b5fb?rik=CFotL%2bB31YHTkQ&pid=ImgRaw&r=0",
    answer: ["Hà Nội", "Hồ Chí Minh", "Đà Nẵng", "Huế"],
    correctAnswer: "Hà Nội",
  },
  {
    title: "Biển lớn nhất thế giới là gì?",
    image:
      "https://th.bing.com/th/id/R.52f03ae375de602739fd456a55a3b5fb?rik=CFotL%2bB31YHTkQ&pid=ImgRaw&r=0",
    answer: ["Biển Đông", "Biển Đen", "Thái Bình Dương", "Địa Trung Hải"],
    correctAnswer: "Thái Bình Dương",
  },
  {
    title: "5 x 6 bằng bao nhiêu?",
    image:
      "https://th.bing.com/th/id/R.52f03ae375de602739fd456a55a3b5fb?rik=CFotL%2bB31YHTkQ&pid=ImgRaw&r=0",
    answer: ["30", "25", "35", "40"],
    correctAnswer: "30",
  },
  {
    title: "Ai là người sáng lập Microsoft?",
    image:
      "https://th.bing.com/th/id/R.52f03ae375de602739fd456a55a3b5fb?rik=CFotL%2bB31YHTkQ&pid=ImgRaw&r=0",
    answer: ["Steve Jobs", "Elon Musk", "Bill Gates", "Mark Zuckerberg"],
    correctAnswer: "Bill Gates",
  },
  {
    title: "Kim tự tháp lớn nhất thế giới nằm ở đâu?",
    image:
      "https://th.bing.com/th/id/R.52f03ae375de602739fd456a55a3b5fb?rik=CFotL%2bB31YHTkQ&pid=ImgRaw&r=0",
    answer: ["Ai Cập", "Mexico", "Trung Quốc", "Peru"],
    correctAnswer: "Mexico",
  },
  {
    title: "Ngôn ngữ lập trình nào phổ biến nhất hiện nay?",
    image:
      "https://th.bing.com/th/id/R.52f03ae375de602739fd456a55a3b5fb?rik=CFotL%2bB31YHTkQ&pid=ImgRaw&r=0",
    answer: ["Python", "Java", "JavaScript", "C++"],
    correctAnswer: "JavaScript",
  },
  {
    title: "Hành tinh nào gần Mặt Trời nhất?",
    image:
      "https://th.bing.com/th/id/R.52f03ae375de602739fd456a55a3b5fb?rik=CFotL%2bB31YHTkQ&pid=ImgRaw&r=0",
    answer: ["Sao Kim", "Sao Thủy", "Sao Hỏa", "Sao Mộc"],
    correctAnswer: "Sao Thủy",
  },
  {
    title: "Loài động vật nào là biểu tượng của Úc?",
    image:
      "https://th.bing.com/th/id/R.52f03ae375de602739fd456a55a3b5fb?rik=CFotL%2bB31YHTkQ&pid=ImgRaw&r=0",
    answer: ["Gấu trúc", "Sư tử", "Kangaroo", "Gấu Bắc Cực"],
    correctAnswer: "Kangaroo",
  },
  {
    title: "Năm 1945, sự kiện gì quan trọng diễn ra tại Việt Nam?",
    image:
      "https://th.bing.com/th/id/R.52f03ae375de602739fd456a55a3b5fb?rik=CFotL%2bB31YHTkQ&pid=ImgRaw&r=0",
    answer: [
      "Cách mạng tháng Tám",
      "Chiến tranh Đông Dương",
      "Đổi mới kinh tế",
      "Thành lập Đảng Cộng sản Việt Nam",
    ],
    correctAnswer: "Cách mạng tháng Tám",
  },
  {
    title: "Ai là tác giả của truyện 'Dế Mèn phiêu lưu ký'?",
    image:
      "https://th.bing.com/th/id/R.52f03ae375de602739fd456a55a3b5fb?rik=CFotL%2bB31YHTkQ&pid=ImgRaw&r=0",
    answer: ["Nguyễn Nhật Ánh", "Tô Hoài", "Nam Cao", "Ngô Tất Tố"],
    correctAnswer: "Tô Hoài",
  },
  {
    title: "Quốc gia nào có diện tích lớn nhất thế giới?",
    image:
      "https://th.bing.com/th/id/R.52f03ae375de602739fd456a55a3b5fb?rik=CFotL%2bB31YHTkQ&pid=ImgRaw&r=0",
    answer: ["Mỹ", "Canada", "Trung Quốc", "Nga"],
    correctAnswer: "Nga",
  },
  {
    title: "Ai là người đầu tiên đặt chân lên Mặt Trăng?",
    image:
      "https://th.bing.com/th/id/R.52f03ae375de602739fd456a55a3b5fb?rik=CFotL%2bB31YHTkQ&pid=ImgRaw&r=0",
    answer: ["Neil Armstrong", "Buzz Aldrin", "Yuri Gagarin", "Elon Musk"],
    correctAnswer: "Neil Armstrong",
  },
  {
    title: "Bộ phim hoạt hình nào của Disney có nhân vật Elsa?",
    image:
      "https://th.bing.com/th/id/R.52f03ae375de602739fd456a55a3b5fb?rik=CFotL%2bB31YHTkQ&pid=ImgRaw&r=0",
    answer: ["Công chúa ngủ trong rừng", "Frozen", "Aladdin", "Nàng tiên cá"],
    correctAnswer: "Frozen",
  },
  {
    title: "Ai là nhà vật lý nổi tiếng với thuyết tương đối?",
    image:
      "https://th.bing.com/th/id/R.52f03ae375de602739fd456a55a3b5fb?rik=CFotL%2bB31YHTkQ&pid=ImgRaw&r=0",
    answer: [
      "Isaac Newton",
      "Albert Einstein",
      "Galileo Galilei",
      "Stephen Hawking",
    ],
    correctAnswer: "Albert Einstein",
  },
  {
    title: "Bức tranh Mona Lisa do ai vẽ?",
    image:
      "https://th.bing.com/th/id/R.52f03ae375de602739fd456a55a3b5fb?rik=CFotL%2bB31YHTkQ&pid=ImgRaw&r=0",
    answer: [
      "Pablo Picasso",
      "Vincent van Gogh",
      "Leonardo da Vinci",
      "Michelangelo",
    ],
    correctAnswer: "Leonardo da Vinci",
  },
  {
    title: "Loài chim nào có thể bắt chước giọng nói con người?",
    image:
      "https://th.bing.com/th/id/R.52f03ae375de602739fd456a55a3b5fb?rik=CFotL%2bB31YHTkQ&pid=ImgRaw&r=0",
    answer: ["Chim bồ câu", "Chim đại bàng", "Chim két", "Chim sẻ"],
    correctAnswer: "Chim két",
  },
  {
    title: "Nước nào là quê hương của môn võ karate?",
    image:
      "https://th.bing.com/th/id/R.52f03ae375de602739fd456a55a3b5fb?rik=CFotL%2bB31YHTkQ&pid=ImgRaw&r=0",
    answer: ["Trung Quốc", "Nhật Bản", "Hàn Quốc", "Brazil"],
    correctAnswer: "Nhật Bản",
  },
  {
    title: "Hệ điều hành Android thuộc sở hữu của công ty nào?",
    image:
      "https://th.bing.com/th/id/R.52f03ae375de602739fd456a55a3b5fb?rik=CFotL%2bB31YHTkQ&pid=ImgRaw&r=0",
    answer: ["Apple", "Google", "Microsoft", "Samsung"],
    correctAnswer: "Google",
  },
];

export default questions;
