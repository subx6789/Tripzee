export const SelectTravelesList = [
  {
    id: 1,
    title: "Solo Travel",
    desc: "A journey for the lone explorer",
    icon: "✈️",
    people: "1",
  },
  {
    id: 2,
    title: "Honeymoon",
    desc: "A romantic trip for two",
    icon: "🥂",
    people: "2",
  },
  {
    id: 3,
    title: "Family or Friends",
    desc: "Fun for families or groups",
    icon: "🎉",
    people: "3 or more",
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Cheap",
    desc: "Travel wisely, save money",
    icon: "💵",
  },
  {
    id: 2,
    title: "Moderate",
    desc: "Enjoy comfort, spend moderately",
    icon: "💰",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Live lavishly, no budget limits",
    icon: "💸",
  },
];

export const AI_PROMPT = "Generate Travel Plan for location: ${location}, for ${totalDays} days for ${traveler} with a ${budget} budget, give me a hotels options list with Hotelname, hotel address, price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placename, place details, place image url, geo coordinates, ticket pricing, rating, time travel each of the location for ${totalDays} days with each day plan with best time to visit in JSON format.";
