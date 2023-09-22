export default [
  {
    id: "0000001",
    name: {
      status: "visible", // visible, visible, hidden
      value: "Аморалка",
    },
    image: {
      status: "visible", // visible, visible, hidden
      value: "event-01.jpg",
    },
    text: {
      status: "visible", // visible, visible, hidden
      value:
        "Формат просто ахуй... (с) В последнее время стало слишком много запретных тем не только для юмора, но и просто для обсуждений. На один вечер комики отринут все ограничения и будут шутить про всё самое актуальное и злободневное. Зачем держать в себе, если можно от души посмеяться над этим?",
    },
    reputation: {
      status: "visible", // visible, visible, hidden
      value: 194,
    },
    description: {
      format: {
        status: "visible", // visible, visible, hidden
        value: "Концерт",
      },
      status: {
        status: "visible", // visible, visible, hidden
        value: "active", // active, past, planned
      },
      type: {
        status: "visible", // visible, visible, hidden
        value: "paid", // paid, open, private
      },
      website: {
        status: "visible", // visible, visible, hidden
        value: "https://nethouse.id/improvrussia",
      },
      date: {
        status: "visible", // visible, visible, hidden
        value: {
          start: "2023-08-06 19:00:00",
          end: "2023-08-08 22:00:00",
        },
      },
      location: {
        status: "visible", // visible, visible, hidden
        value: {
          address: "Москва, ул. Садовая-Кудринская, 20 (Stand Up Патрики)",
          geo: {
            longitude: 55.751,
            latitude: 37.617,
          },
        },
      },
    },
    members: {
      status: "visible", // visible, visible, hidden
      value: ["0000002", "0000003", "0000004", "0000005", "0000005", "0000005"],
    },
    organizers: {
      status: "visible", // visible, visible, hidden
      value: [
        {
          id: "0000001",
          name: "Improv Russia",
          description: "компания по строительству в Дубаи",
          reputation: 194,
          members: 280,
          src: "partner-01.jpg",
          isImgRect: false,
          isVerified: false,
          isKonTXT: false,
        },
        {
          id: "0000002",
          name: "Improv Russia",
          description: "компания по строительству в Дубаи",
          reputation: 194,
          members: 280,
          src: "partner-02.png",
          isImgRect: true,
          isVerified: true,
          isKonTXT: true,
        },
        {
          id: "0000003",
          name: "Select Group",
          description: "компания по строительству в Ирландии",
          reputation: 194,
          members: 280,
          src: "partner-03.png",
          isImgRect: true,
          isVerified: true,
          isKonTXT: true,
        },
        {
          id: "0000004",
          name: "Select Group",
          description: "компания по строительству в Дубаи",
          reputation: 194,
          members: 280,
          src: "partner-04.jpg",
          isImgRect: false,
          isVerified: true,
          isKonTXT: true,
        },
      ],
    },
    speakers: {
      status: "visible", // visible, visible, hidden
      value: [
        {
          id: "0000001",
          name: "Арман Ерканян",
          job: "команда “Цветные",
          profession:
            "Эксперт по развитию человекоцентричной культуры и управлению опытом клиентов и сотрудников Партнёр Академии Historia, тренер INEX Service Design",
          src: "performer-01.jpg",
          isKonTXT: false,
        },
        {
          id: "0000002",
          name: "Мартин Разроев",
          job: "организатор Improv Russia, команда “Ироничные”",
          profession: "организатор Improv Russia, команда “Ироничные”",
          src: "performer-02.jpg",
          isKonTXT: false,
        },
        {
          id: "0000003",
          name: "Павел Сердюков",
          job: "место работы, должность",
          profession: "организатор Improv Russia, команда “Ироничные”",
          src: "performer-03.jpg",
          isKonTXT: true,
        },
        {
          id: "0000004",
          name: "Азарова Наталья",
          job: "команда “Цветные",
          profession:
            "Executive-коуч, фасилитатор, консультант компании “Земля Стратега“, ведущая сессий организационного и стратегического развития",
          src: "performer-04.jpg",
          isKonTXT: true,
        },
        {
          id: "0000005",
          name: "Ёжкина Ольга",
          job: "организатор Improv Russia, команда “Ироничные”",
          profession:
            "HR-директор в крупной ИТ - компании, коуч лидеров и команд, ментор в сфере управления персоналом, игропрактик",
          src: "performer-05.jpg",
          isKonTXT: false,
        },
      ],
    },
    timetable: {
      status: "visible", // visible, visible, hidden
      value: [
        {
          id: "0000001",
          title: "Название блока",
          text: "Я имею большой опыт работы в компании, где я занимался задачами связанными с созданием новых проектов и их управлением. В процессе работы, я успешно руководил командой из различных отделов, включая софт и хард разработчиков, маркетологов и менеджеров по продажам...",
          date: {
            start: "2023-08-31 10:00:00",
            end: "2023-08-31 11:00:00",
          },
        },
        {
          id: "0000002",
          title: "Название блока",
          text: "Я имею большой опыт работы в компании, где я занимался задачами связанными с созданием новых проектов и их управлением. В процессе работы, я успешно руководил командой из различных отделов, включая софт и хард разработчиков, маркетологов и менеджеров по продажам...",
          date: {
            start: "2023-08-31 11:00:00",
            end: "2023-08-31 12:00:00",
          },
        },
        {
          id: "0000003",
          title: "Обед",
          text: "",
          date: {
            start: "2023-08-31 13:00:00",
            end: "2023-08-31 15:00:00",
          },
        },
        {
          id: "0000004",
          title: "Название блока",
          text: "Я имею большой опыт работы в компании, где я занимался задачами связанными с созданием нов",
          date: {
            start: "2023-08-31 15:00:00",
            end: "2023-08-31 17:00:00",
          },
        },
        {
          id: "0000005",
          title: "Название блока",
          text: "Я имею большой опыт работы в компании, где я занимался задачами связанными с созданием новых проектов и их управлением. В процессе работы, я успешно руководил командой из различных отделов, включая софт и хард разработчиков, маркетологов и менеджеров по продажам...",
          date: {
            start: "2023-08-31 17:00:00",
            end: "2023-08-31 19:00:00",
          },
        },
        {
          id: "0000006",
          title: "6-ой блок",
          text: "Я имею большой опыт работы в компании, где я занимался задачами связанными с созданием новых проектов и их управлением. В процессе работы, я успешно руководил командой из различных отделов, включая софт и хард разработчиков, маркетологов и менеджеров по продажам...",
          date: {
            start: "2023-08-31 19:00:00",
            end: "2023-08-31 20:00:00",
          },
        },
        {
          id: "0000007",
          title: "7-ой блок",
          text: "Я имею большой опыт работы в компании, где я занимался задачами связанными с созданием новых проектов и их управлением. В процессе работы, я успешно руководил командой из различных отделов, включая софт и хард разработчиков, маркетологов и менеджеров по продажам...",
          date: {
            start: "2023-08-31 20:00:00",
            end: "2023-08-31 21:00:00",
          },
        },
      ],
    },
    reviews: {
      status: "visible", // visible, visible, hidden
      value: [
        {
          text: "Мария поделилась полезным опытом в создании кросс-функциональной команды при ограниченном бюдж... Мария поделилась полезным опытом...",
          id: "0000002",
        },
        {
          text: "Мария поделилась полезным опытом в создании кросс-функциональной команды при ограниченном бюдж... Мария поделилась полезным опытом...",
          id: "0000003",
        },
        {
          text: "Мария поделилась полезным опытом в создании кросс-функциональной команды при ограниченном бюдж... Мария поделилась полезным опытом...",
          id: "0000004",
        },
      ],
    },
    partners: {
      status: "visible", // visible, visible, hidden
      value: [
        {
          id: "0000001",
          name: "OMNIYAT",
          description: "компания по строительству в Дубаи",
          src: "partner-01.jpg",
          isImgRect: false,
          isVerified: true,
          isKonTXT: true,
        },
        {
          id: "0000002",
          name: "Искра",
          description: "компания по строительству в Дубаи",
          src: "partner-02.png",
          isImgRect: true,
          isVerified: true,
          isKonTXT: true,
        },
        {
          id: "0000003",
          name: "Select Group",
          description: "компания по строительству в Дубаи и Ирландии",
          src: "partner-03.png",
          isImgRect: true,
          isVerified: true,
          isKonTXT: true,
        },
        {
          id: "0000004",
          name: "Select Group",
          description: "компания по строительству в Дубаи",
          src: "partner-04.jpg",
          isImgRect: false,
          isVerified: true,
          isKonTXT: true,
        },
      ],
    },
    contacts: {
      status: "visible", // visible, visible, hidden
      socials: [
        {
          type: "phone",
          status: "visible", // visible, visible, hidden
          text: "+7 (983) 765 93 21",
          href: "tel:+79837659321",
          messenger: ["telegram", "viber", "whatsapp"],
        },
        {
          type: "secondPhone",
          status: "visible", // visible, visible, hidden
          text: "+7 (999) 777 55 22",
          href: "tel:+79997775522",
        },
        {
          type: "instagram",
          status: "visible", // visible, visible, hidden
          text: "@maria.tverdh007",
          href: "#instagram",
          // href: "https://instagram.com",
        },
        {
          type: "email",
          status: "visible", // visible, visible, hidden
          text: "maria.tverdh@gmail.com",
          href: "mailto:maria.tverdh@gmail.com",
        },
        {
          type: "facebook",
          status: "visible", // visible, visible, hidden
          text: "maria-tverdh-651909224",
          href: "#facebook",
          // href: "https://facebook.com",
        },
        {
          type: "company-website",
          status: "visible", // visible, visible, hidden
          text: "https://nethouse.id/improvrussia",
          href: "#company-website",
          // href: "https://nethouse.id/improvrussia",
        },
        {
          type: "vk",
          status: "visible", // visible, visible, hidden
          text: "maria-tverdh-651909224",
          href: "#vk",
          // href: "https://vk.com",
        },
        {
          type: "website",
          status: "visible", // visible, visible, hidden
          text: "https://nethouse.id/improvrussia",
          href: "#website",
          // href: "https://nethouse.id/improvrussia",
        },
      ],
      location: {
        status: "visible",
        address: "Москва, ул. Садовая-Кудринская, 20 (Stand Up Патрики)",
        geo: {
          lat: 55.762648,
          lng: 37.587583,
        },
      },
    },
  },
];
