export default () => {
  return {
    // 绘制图表
    one: {
      xAxis: {
        type: "category",
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [1500, 230, 0, 0, 0, 0, 0],
          type: "line",
          label: {
            show: true,
          },
        },
      ],
    },
    two: {
      legend: {
        data: ["肛肠科", "肠胃科", "儿童科"],
      },
      xAxis: {
        type: "category",
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "肛肠科",
          data: [12, 3, 0, 0, 0, 0, 0],
          type: "line",
          label: {
            show: true,
          },
        },
        {
          name: "肠胃科",
          data: [11, 5, 0, 0, 0, 0, 0],
          type: "line",
          label: {
            show: true,
          },
        },
        {
          name: "儿童科",
          data: [14, 6, 0, 0, 0, 0, 0],
          type: "line",
          label: {
            show: true,
          },
        },
      ],
    },
    three: {
      tooltip: {},
      xAxis: {
        data: [
          "3/1",
          "3/2",
          "3/3",
          "3/4",
          "3/5",
          "3/6",
          "3/7",
          "3/8",
          "3/9",
          "3/10",
          "3/11",
          "3/12",
          "3/13",
          "3/14",
          "3/15",
          "3/16",
          "3/17",
          "3/18",
          "3/19",
          "3/20",
          "3/21",
          "3/22",
          "3/23",
          "3/24",
          "3/25",
          "3/26",
          "3/27",
          "3/28",
          "3/29",
          "3/30",
          "3/31",
        ],
      },
      yAxis: {},
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      series: [
        {
          name: "注册量",
          type: "bar",
          data: [
            15, 20, 36, 18, 22, 23, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          ],
          label: {
            show: true,
          },
        },
      ],
    },
  };
};
