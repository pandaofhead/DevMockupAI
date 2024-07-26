export default {
  firstName: "Harry",
  lastName: "Potter",
  jobTitle: "Auror",
  address: "4 Privet Drive, Little Whinging, Surrey",
  phone: "(123)-456-7890",
  email: "harry.potter@hogwarts.co.uk",
  themeColor: "#000000",
  education: [
    {
      id: 1,
      universityName: "Hogwarts School of Witchcraft and Wizardry",
      startDate: "Sept 1991",
      endDate: "Jun 1997",
      degree: "N.E.W.T.s",
      major: "Defense Against the Dark Arts",
      description:
        "Top grades in Defense Against the Dark Arts, Transfiguration, and Potions.",
    },
  ],
  skills: [
    {
      id: 1,
      name: "Magic",
      list: "Defense Against the Dark Arts, Transfiguration, Potions, Charms",
    },
    {
      id: 2,
      name: "Non-Magical Skills",
      list: "Leadership, Teamwork, Problem-Solving, Critical Thinking",
    },
    {
      id: 3,
      name: "Tools",
      list: "Wand, Broomstick, Invisibility Cloak, Marauder's Map",
    },
  ],
  experience: [
    {
      id: 1,
      title: "Auror",
      companyName: "Ministry of Magic",
      city: "London",
      state: "England",
      startDate: "Sept 1998",
      endDate: "",
      currentlyWorking: true,
      workSummary:
        "Successfully led numerous missions to capture and neutralize dark wizards and magical threats.\n" +
        "• Collaborated with fellow Aurors to develop and implement effective defense strategies.\n" +
        "• Conducted extensive research on dark magic and protective spells.\n" +
        "• Trained new recruits in advanced defensive and offensive magic techniques.",
    },
    {
      id: 2,
      title: "Defense Against the Dark Arts Instructor",
      companyName: "Hogwarts School of Witchcraft and Wizardry",
      city: "Hogsmeade",
      state: "Scotland",
      startDate: "Sept 1997",
      endDate: "Jun 1998",
      currentlyWorking: false,
      workSummary:
        "• Taught advanced Defense Against the Dark Arts to students from years 1 through 7.\n" +
        "• Developed comprehensive lesson plans and practical exercises.\n" +
        "• Mentored students in mastering defensive spells and counter-curses.\n" +
        "• Organized and supervised practical exams and defense challenges.",
    },
  ],
  project: [
    {
      id: 1,
      title: "Defeat of the Basilisk",
      startDate: "1992",
      endDate: "1993",
      currentlyWorking: false,
      projectSummary:
        "• Discovered the secret entrance to the Chamber of Secrets.\n" +
        "• Rescued Ginny Weasley from the Basilisk's lair.\n" +
        "• Destroyed Tom Riddle's diary, thereby vanquishing the Basilisk.",
    },
    {
      id: 2,
      title: "Triwizard Tournament",
      startDate: "1994",
      endDate: "1995",
      currentlyWorking: false,
      projectSummary:
        "• Competed in the Triwizard Tournament as the Hogwarts champion.\n" +
        "• Survived numerous challenges and obstacles to reach the final task.\n" +
        "• Rescued Cedric Diggory from Lord Voldemort's trap.",
    },
  ],
};
