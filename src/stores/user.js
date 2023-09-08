import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
	const userInfo = ref({
		id: '0000001',
		name: 'Мария Твердых',
		karma: {
			status: 'visible',
			value: 30,
		},
		reputation: {
			status: 'visible',
			value: 3072
		},
		isVerified: true,
		src: 'avatar-01.jpg',
		profession: {
			status: 'visible',
			value: 'Дизайн',
		},
		job: {
			status: 'visible', // visible, blur, hidden
			value: 'Арт-Директор'
		},
		company: {
			status: 'visible', // visible, blur, hidden
			value: 'Future Lab'
		},
		address: {
			status: 'visible', // visible, blur, hidden
			value: 'Россия, Санкт-Петербург'
		},
		interests: {
			status: 'visible', // visible, blur, hidden
			value: ['Управление командами','3d','Менторство','Продажи','Data science','Иностранные языки','Кадры', 'Gamedev'],
		},
		groups: {
			status: 'visible', // visible, blur, hidden
			value: ['group 1', 'group 2', 'group 3'],
		},
		events: {
			status: 'visible', // visible, blur, hidden
			value: ['event 1', 'event 2', 'event 3'],
		},
		achivements: {
			status: 'visible', // visible, blur, hidden
			value: ['crown', 'target', 'magnet']
		},
		donars: {
			status: 'visible', // visible, blur, hidden
			value: ['0000002', '0000003', '0000004', '0000005', '0000006']
		},
		gender: 'female',
		phone: '+7 (999) 999-99-99',
		email: 'mariya@ya.ru',
		description:  {
			status: 'visible', // visible, blur, hidden
			value: 'Создаю Hyper casual игры с охватом пользователей свыше 10 тысяч. Последний проект Jam-Ko. Проект запустили на международный рынок. Большой опыт в управлении кросс-функциональными командами. Создаю Hyper casual игры с охватом пользователей свыше 10 тысяч. Последний проект Jam-Ko. Проект запустили на международный рынок. Большой опыт в управлении кросс-функциональными командами. ',
		},
		givingReputation: {
			'0000002': 20,
			'0000003': 100,
			'0000004': 20,
			'0000005': 10,
		},
		socials: [
			{type: 'phone', text: '+7 (983) 765 93 21', href: '#', status: 'blur', messenger: ['telegram', 'whatsapp', 'viber']},
			{type: 'telegram', text: '@maria.tverdh007', href: '#', status: 'primary'},
			{type: 'instagram', text: '@maria.tverdh007', href: '#', status: 'hidden'},
			{type: 'other', text: 'maria-tverdh-651909224', href: '#', status: 'blur'},
			{type: 'linkedin', text: 'maria-tverdh-651909224', href: '#', status: 'visible'},
			{type: 'email', text: 'maria.tverdh@gmail.com', href: '#', status: 'visible'},
			{type: 'facebook', text: 'maria-tverdh-651909224', href: '#', status: 'visible'},
			{type: 'website', text: 'maria.tverdh@gmail.com', href: '#', status: 'visible'},
			{type: 'vk', text: 'maria-tverdh-651909224', href: '#', status: 'visible'},
			{type: 'company-website', text: 'maria-tverdh-651909224', href: '#', status: 'visible'},
			{type: 'twitter', text: 'maria-tverdh-651909224', href: '#', status: 'visible'},
			{type: 'kontxt', text: 'Написать в KonTxT', href: '#', status: 'visible'},
		],
		reviews: {
			status: 'visible',
			value: [
				{
					text: 'Мария поделилась полезным опытом в создании кросс-функциональной команды при ограниченном бюдж... Мария поделилась полезным опытом...',
					id: '0000002',
				},
				{
					text: 'Мария поделилась полезным опытом в создании кросс-функциональной команды при ограниченном бюдж... Мария поделилась полезным опытом...',
					id: '0000003',
				},
				{
					text: 'Мария поделилась полезным опытом в создании кросс-функциональной команды при ограниченном бюдж... Мария поделилась полезным опытом...',
					id: '0000004',
				},
			],
		},
		videoReviews: {
			status: 'visible',
			value: [
				{
					id: '0000002',
					src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
					round: true
				},
				{
					id: '0000003',
					src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
					round: false
				},
				{
					id: '0000004',
					src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
					round: false
				},
				{
					id: '0000005',
					src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
					round: false
				},
				{
					id: '0000006',
					src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
					round: false
				},
			],
		},
		sertificates: {
			status: 'visible',
			value: [
				{
					src: "sertificate-03.jpg",
					title: "HarvardX's Computer Science for Game Development",
					company: "edx",
					date: "2020",
				},
				{
					src: "sertificate-01.jpg",
					title: "HarvardX's Computer Science for Game Development",
					company: "edx",
					date: "2020",
				},
				{
					src: "sertificate-02.jpg",
					title: "HarvardX's Computer Science for Game Development",
					company: "edx",
					date: "2020",
				},
				{
					src: "sertificate-03.jpg",
					title: "HarvardX's Computer Science for Game Development",
					company: "edx",
					date: "2020",
				},
				{
					src: "sertificate-04.jpg",
					title: "HarvardX's Computer Science for Game Development",
					company: "edx",
					date: "2020",
				},
				{
					src: "sertificate-04.jpg",
					title: "HarvardX's Computer Science for Game Development",
					company: "edx",
					date: "2020",
				},
			],
		},
		notes: {
			'0000002': 'Заметка о человеке с id 0000002'
		},
		projects: {
			status: 'visible',
			value:[
				{
					title: 'Проект 1',
					date: '2020',
					results: [
						'Вот так сделали',
						'Вот так сделали',
						'Вот так сделали',
					],
					images: ['sertificate-01.jpg', 'sertificate-02.jpg', 'sertificate-03.jpg', 'sertificate-03.jpg', 'sertificate-03.jpg'],
					members: ['0000001', '0000002', '0000003', '0000004', '0000005'],
					description: 'какие мы крутышки сделали проектик запустились и не просрали бюджет',
					link: 'www.testlinks.com'
				},
				{
					title: 'Проект 2',
					date: '2020',
					results: [
						'Вот так сделали',
						'Вот так сделали',
						'Вот так сделали',
					],
					images: ['sertificate-02.jpg', 'sertificate-03.jpg'],
					members: ['0000002', '0000003', '0000004', '0000005'],
					description: 'какие мы крутышки сделали проектик запустились и не просрали бюджет',
					link: 'www.testlinks.com'
				},
				{
					title: 'Проект 3',
					date: '2020',
					results: [
						'Вот так сделали',
						'Вот так сделали',
						'Вот так сделали',
					],
					images: ['sertificate-01.jpg', 'sertificate-02.jpg', 'sertificate-03.jpg'],
					members: ['0000001', '0000002', '0000003'],
					description: 'какие мы крутышки сделали проектик запустились и не просрали бюджет',
					link: 'www.testlinks.com'
				},
			],
		},
		works: {
			status: 'visible',
			value: [
				{
					isVerified: false,
					title: 'Место работы',
					src: 'logo-01.png',
					reputation: 194,
					dateStart: '2020',
					dateEnd: '2021',
					job: 'Должность',
					description: 'Я имею большой опыт работы в компании, где я занимался задачами связанными с созданием новых проектов и их управлением. В процессе работы, я успешно руководил командой из различных отделов, включая софт и хард разработчиков, маркетологов и менеджеров по продажам... Мой опыт также включает работу с множеством программных обеспечений и платформ, в том числе с SAP, Oracle, Salesforce и другими. Я обладаю навыками в области анализа и оптимизации бизнес-процессов, а также в области бюджетирования и управления проектами. Кроме того, я обладаю навыками в области настройки и разработки больших и сложных систем управления данных'
				},
				{
					isVerified: true,
					title: 'Место работы 2',
					src: 'logo-01.png',
					reputation: 300,
					dateStart: '2021',
					dateEnd: '2023',
					job: 'Должность 2',
					description: 'Я имею большой опыт работы в компании, где я занимался задачами связанными с созданием новых проектов и их управлением. В процессе работы, я успешно руководил командой из различных отделов, включая софт и хард разработчиков, маркетологов и менеджеров по продажам... Мой опыт также включает работу с множеством программных обеспечений и платформ, в том числе с SAP, Oracle, Salesforce и другими. Я обладаю навыками в области анализа и оптимизации бизнес-процессов, а также в области бюджетирования и управления проектами. Кроме того, я обладаю навыками в области настройки и разработки больших и сложных систем управления данных'
				},
			],
		},
		reputationInfo: {
			activity: [],
			profile: [
				{title: 'Заполнен', value: 250},
				{title: 'Подтвержден email', value: 200},
				{title: 'Подтвержден телефон', value: 100},
			],
			popular: [
				{title: 'Что-то сказал', value: 250},
				{title: 'Что-то написал', value: 250},
			],
			contribution: [
				{title: 'В МММ', value: 690},
				{title: 'Завод по производству пирамидок', value: 10},
			],
			achivements: [
				{title: 'Каменный век', value: 10},
				{title: 'Обновка!', value: 10},
				{title: 'Куй железо...', value: 10},
			],
			others: [
				{title: 'Другая 1', value: 10},
				{title: 'Другая 2', value: 10},
				{title: 'Другая 3', value: 10},
			],
		}
	})

	const setNote = (id, notes) => {
		userInfo.value.notes[id] = notes
	}

	const isAuth = computed(() => {
		return localStorage.getItem('auth') === 'true' ? true : false
	})

	const setAuth = () => {
		isAuth.value = true
	}

  return { userInfo, isAuth, setAuth, setNote }
})