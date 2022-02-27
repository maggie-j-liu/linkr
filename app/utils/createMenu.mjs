const createMenu = (key) => {
  return {
    components: [
      {
        type: 1,
        components: [
          {
            type: 2,
            style: 1,
            label: "View Clicks",
            custom_id: `clicks-${key}`,
          },
          {
            type: 2,
            style: 2,
            label: "Clear Clicks",
            custom_id: `clear-${key}`,
          },
          {
            type: 2,
            style: 4,
            label: "Delete Link",
            custom_id: `delete-${key}`,
          },
        ],
      },
    ],
  };
};

export default createMenu;
