/* Target Incomplete Chart */
export const TargetIncomplete = {
    chart: {
        height: 127,
        width: 100,
        type: "radialBar",
    },

    series: [48],
    colors: ["rgba(255,255,255,0.9)"],
    plotOptions: {
        radialBar: {
            hollow: {
                margin: 0,
                size: "55%",
                background: "#fff"
            },
            dataLabels: {
                name: {
                    offsetY: -10,
                    color: "#4b9bfa",
                    fontSize: ".625rem",
                    show: false
                },
                value: {
                    offsetY: 5,
                    color: "#4b9bfa",
                    fontSize: ".875rem",
                    show: true,
                    fontWeight: 600
                }
            }
        }
    },
    stroke: {
        lineCap: "round"
    },
    labels: ["Status"]
};
//AllDropdown
export const AllDropdown = [
    { lable: "Week", link: "#!" },
    { lable: "Month", link: "#!" },
    { lable: "Year", link: "#!" },
];
// Array of deals directly within the parent component
export const deals = [
    {
        name: 'Michael Jordan',
        email: 'michael.jordan@example.com',
        avatar: '../images/faces/10.jpg',
        avatarText: '',
        amount: '$2,893',
        avatarBgColor: ''
    },
    {
        name: 'Emigo Kiaren',
        email: 'emigo.kiaren@gmail.com',
        avatar: '',
        avatarText: 'EK',
        amount: '$4,289',
        avatarBgColor: 'bg-warning-transparent'
    },
    {
        name: 'Randy Origoan',
        email: 'randy.origoan@gmail.com',
        avatar: '../images/faces/12.jpg',
        avatarText: '',
        amount: '$6,347',
        avatarBgColor: ''
    },
    {
        name: 'George Pieterson',
        email: 'george.pieterson@gmail.com',
        avatar: '',
        avatarText: 'GP',
        amount: '$3,894',
        avatarBgColor: 'bg-success-transparent'
    },
    {
        name: 'Kiara Advain',
        email: 'kiaraadvain214@gmail.com',
        avatar: '',
        avatarText: 'KA',
        amount: '$2,679',
        avatarBgColor: 'bg-primary-transparent'
    }
];
//EarnedDropdown
export const EarnedDropdown = [
    { lable: "Today", link: "#!" },
    { lable: "This Week", link: "#!" },
    { lable: "Last Week", link: "#!" },
];
/* Profits Earned Chart */
export const ProfitsEarned = {
    series: [{
        name: 'Profit Earned',
        data: [44, 42, 57, 86, 58, 55, 70],
    }, {
        name: 'Total Sales',
        data: [34, 22, 37, 56, 21, 35, 60],
    }],
    chart: {
        type: 'bar',
        height: 180,
        toolbar: {
            show: false,
        }
    },
    grid: {
        borderColor: '#f1f1f1',
        strokeDashArray: 3
    },
    colors: ["var(--primary-color)", "#e4e7ed"],
    plotOptions: {
        bar: {
            colors: {
                ranges: [{
                    from: -100,
                    to: -46,
                    color: '#ebeff5'
                }, {
                    from: -45,
                    to: 0,
                    color: '#ebeff5'
                }]
            },
            columnWidth: '60%',
            borderRadius: 5,
        }
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        show: true,
        width: 2,
        colors: undefined,
    },
    legend: {
        show: false,
        position: 'top',
    },
    yaxis: {
        title: {
            style: {
                color: '#adb5be',
                fontSize: '13px',
                fontFamily: 'poppins, sans-serif',
                fontWeight: 600,
                cssClass: 'apexcharts-yaxis-label',
            },
        },
        labels: {
            formatter: function (y) {
                return y.toFixed(0) + "";
            }
        }
    },
    xaxis: {
        type: 'week',
        categories: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        axisBorder: {
            show: true,
            color: 'rgba(119, 119, 142, 0.05)',
            offsetX: 0,
            offsetY: 0,
        },
        axisTicks: {
            show: true,
            borderType: 'solid',
            color: 'rgba(119, 119, 142, 0.05)',
            width: 6,
            offsetX: 0,
            offsetY: 0
        },
        labels: {
            rotate: -90
        }
    }
};
/* Total Customers chart */
export const TotalCustomers = {
    chart: {
        type: 'line',
        height: 40,
        width: 100,
        sparkline: {
            enabled: true
        }
    },
    stroke: {
        show: true,
        curve: 'smooth',
        lineCap: 'butt',
        colors: undefined,
        width: 1.5,
        dashArray: 0,
    },
    fill: {
        type: 'gradient',
        gradient: {
            opacityFrom: 0.9,
            opacityTo: 0.9,
            stops: [0, 98],
        }
    },
    series: [{
        name: 'Value',
        data: [20, 14, 19, 10, 23, 20, 22, 9, 12]
    }],
    yaxis: {
        min: 0,
        show: false,
        axisBorder: {
            show: false
        },
    },
    xaxis: {
        show: false,
        axisBorder: {
            show: false
        },
    },
    tooltip: {
        enabled: false,
    },
    colors: ["var(--primary-color)"],
}
/* Total Customers chart */

/* Total revenue chart */
export const Totalrevenue = {
    chart: {
        type: 'line',
        height: 40,
        width: 100,
        sparkline: {
            enabled: true
        }
    },
    stroke: {
        show: true,
        curve: 'smooth',
        lineCap: 'butt',
        colors: undefined,
        width: 1.5,
        dashArray: 0,
    },
    fill: {
        type: 'gradient',
        gradient: {
            opacityFrom: 0.9,
            opacityTo: 0.9,
            stops: [0, 98],
        }
    },
    series: [{
        name: 'Value',
        data: [20, 14, 20, 22, 9, 12, 19, 10, 25]
    }],
    yaxis: {
        min: 0,
        show: false,
        axisBorder: {
            show: false
        },
    },
    xaxis: {
        show: false,
        axisBorder: {
            show: false
        },
    },
    tooltip: {
        enabled: false,
    },
    colors: ["rgb(35, 183, 229)"],

}
/* Total revenue chart */

/* Conversion ratio Chart */
export const Conversionratio = {
    chart: {
        type: 'line',
        height: 40,
        width: 100,
        sparkline: {
            enabled: true
        }
    },
    stroke: {
        show: true,
        curve: 'smooth',
        lineCap: 'butt',
        colors: undefined,
        width: 1.5,
        dashArray: 0,
    },
    fill: {
        type: 'gradient',
        gradient: {
            opacityFrom: 0.9,
            opacityTo: 0.9,
            stops: [0, 98],
        }
    },
    series: [{
        name: 'Value',
        data: [20, 20, 22, 9, 14, 19, 10, 25, 12]
    }],
    yaxis: {
        min: 0,
        show: false,
        axisBorder: {
            show: false
        },
    },
    xaxis: {
        show: false,
        axisBorder: {
            show: false
        },
    },
    tooltip: {
        enabled: false,
    },
    colors: ["rgb(38, 191, 148)"],

}
/* Conversion ratio Chart */

/* Total Deals Chart */
export const TotalDeals = {
    chart: {
        type: 'line',
        height: 40,
        width: 100,
        sparkline: {
            enabled: true
        }
    },
    stroke: {
        show: true,
        curve: 'smooth',
        lineCap: 'butt',
        colors: undefined,
        width: 1.5,
        dashArray: 0,
    },
    fill: {
        type: 'gradient',
        gradient: {
            opacityFrom: 0.9,
            opacityTo: 0.9,
            stops: [0, 98],
        }
    },
    series: [{
        name: 'Value',
        data: [20, 20, 22, 9, 12, 14, 19, 10, 25]
    }],
    yaxis: {
        min: 0,
        show: false,
        axisBorder: {
            show: false
        },
    },
    xaxis: {
        show: false,
        axisBorder: {
            show: false
        },
    },
    tooltip: {
        enabled: false,
    },
    colors: ["rgb(245, 184, 73)"],

}
// Data for the cards
export const TotalData = [
    {
        title: 'Total Customers',
        value: '1,02,890',
        id: 'crm-total-customers',
        chartOptions: TotalCustomers,
        iconClass: 'ti-users',
        iconBgClass: 'bg-primary',
        percentage: '+40%',
        linkText: 'text-primary',
        trendClass: 'text-success'
    },
    {
        title: 'Total Revenue',
        value: '$56,562',
        id: 'crm-total-revenue',
        chartOptions: Totalrevenue,
        iconClass: 'ti-wallet',
        iconBgClass: 'bg-secondary',
        percentage: '+25%',
        linkText: 'text-primary',
        trendClass: 'text-success'
    },
    {
        title: 'Conversion Ratio',
        value: '12.08%',
        iconClass: 'ti-wave-square',
        iconBgClass: 'bg-success',
        percentage: '-12%',
        trendClass: 'text-danger',
        linkText: 'text-success',
        id: 'crm-conversion-ratio',
        chartOptions: Conversionratio,
    },
    {
        title: 'Total Deals',
        value: '2,543',
        iconClass: 'ti-briefcase',
        iconBgClass: 'bg-warning',
        percentage: '+19%',
        trendClass: 'text-success',
        linkText: 'text-warning',
        id: 'crm-total-deals',
        chartOptions: TotalDeals,
    }
];
/* Revenue Analytics Chart */
export const RevenueAnalytics = {
    series: [
        {
            type: 'line',
            name: 'Profit',
            data: [
                {
                    x: 'Jan',
                    y: 100
                },
                {
                    x: 'Feb',
                    y: 210
                },
                {
                    x: 'Mar',
                    y: 180
                },
                {
                    x: 'Apr',
                    y: 454
                },
                {
                    x: 'May',
                    y: 230
                },
                {
                    x: 'Jun',
                    y: 320
                },
                {
                    x: 'Jul',
                    y: 656
                },
                {
                    x: 'Aug',
                    y: 830
                },
                {
                    x: 'Sep',
                    y: 350
                },
                {
                    x: 'Oct',
                    y: 350
                },
                {
                    x: 'Nov',
                    y: 210
                },
                {
                    x: 'Dec',
                    y: 410
                }
            ]
        },
        {
            type: 'line',
            name: 'Revenue',
            chart: {
                dropShadow: {
                    enabled: true,
                    enabledOnSeries: undefined,
                    top: 5,
                    left: 0,
                    blur: 3,
                    color: '#000',
                    opacity: 0.1
                }
            },
            data: [
                {
                    x: 'Jan',
                    y: 180
                },
                {
                    x: 'Feb',
                    y: 620
                },
                {
                    x: 'Mar',
                    y: 476
                },
                {
                    x: 'Apr',
                    y: 220
                },
                {
                    x: 'May',
                    y: 520
                },
                {
                    x: 'Jun',
                    y: 780
                },
                {
                    x: 'Jul',
                    y: 435
                },
                {
                    x: 'Aug',
                    y: 515
                },
                {
                    x: 'Sep',
                    y: 738
                },
                {
                    x: 'Oct',
                    y: 454
                },
                {
                    x: 'Nov',
                    y: 525
                },
                {
                    x: 'Dec',
                    y: 230
                }
            ]
        },
        {
            type: 'area',
            name: 'Sales',
            chart: {
                dropShadow: {
                    enabled: true,
                    enabledOnSeries: undefined,
                    top: 5,
                    left: 0,
                    blur: 3,
                    color: '#000',
                    opacity: 0.1
                }
            },
            data: [
                {
                    x: 'Jan',
                    y: 200
                },
                {
                    x: 'Feb',
                    y: 530
                },
                {
                    x: 'Mar',
                    y: 110
                },
                {
                    x: 'Apr',
                    y: 130
                },
                {
                    x: 'May',
                    y: 480
                },
                {
                    x: 'Jun',
                    y: 520
                },
                {
                    x: 'Jul',
                    y: 780
                },
                {
                    x: 'Aug',
                    y: 435
                },
                {
                    x: 'Sep',
                    y: 475
                },
                {
                    x: 'Oct',
                    y: 738
                },
                {
                    x: 'Nov',
                    y: 454
                },
                {
                    x: 'Dec',
                    y: 480
                }
            ]
        }
    ],
    chart: {
        height: 350,
        animations: {
            speed: 500
        },
        dropShadow: {
            enabled: true,
            enabledOnSeries: undefined,
            top: 8,
            left: 0,
            blur: 3,
            color: '#000',
            opacity: 0.1
        },
    },
    colors: ["var(--primary-color)", "rgba(35, 183, 229, 0.85)", "rgba(119, 119, 142, 0.05)"],
    dataLabels: {
        enabled: false
    },
    grid: {
        borderColor: '#f1f1f1',
        strokeDashArray: 3
    },
    stroke: {
        curve: 'smooth',
        width: [2, 2, 0],
        dashArray: [0, 5, 0],
    },
    xaxis: {
        axisTicks: {
            show: false,
        },
    },
    yaxis: {
        labels: {
            formatter: function (value) {
                return "$" + value;
            }
        },
    },
    tooltip: {
        y: [{
            formatter: function (e) {
                return void 0 !== e ? "$" + e.toFixed(0) : e
            }
        }, {
            formatter: function (e) {
                return void 0 !== e ? "$" + e.toFixed(0) : e
            }
        }, {
            formatter: function (e) {
                return void 0 !== e ? e.toFixed(0) : e
            }
        }]
    },
    legend: {
        show: true,
        customLegendItems: ['Profit', 'Revenue', 'Sales'],
        inverseOrder: true,
        markers: {
            size: 7,
            strokeWidth: 0,
        },
    },
    title: {
        text: 'Revenue Analytics with sales & profit (USD)',
        align: 'left',
        style: {
            fontSize: '.8125rem',
            fontWeight: 'semibold',
            color: '#8c9097'
        },
    },
    markers: {
        hover: {
            sizeOffset: 5
        }
    }
};
//SortByDropdown
export const SortByDropdown = [
    { lable: "New", link: "#!" },
    { lable: "Popular", link: "#!" },
    { lable: "Relevant", link: "#!" },
];
// Define an array of data objects for the table rows
export const tableData = [
    {
        id: "checkboxNoLabel2",
        name: "Mayor Kelly",
        role: "Manufacture",
        email: "mayorkelly@gmail.com",
        country: "Germany",
        period: "Sep 15 - Oct 12, 2023",
        avatar: "../images/faces/4.jpg",
        badgeClass: "bg-info-transparent",
        checked: false
    },
    {
        id: "checkboxNoLabel13",
        name: "Andrew Garfield",
        role: "Development",
        email: "andrewgarfield@gmail.com",
        country: "Canada",
        period: "Apr 10 - Dec 12, 2023",
        avatar: "../images/faces/15.jpg",
        badgeClass: "bg-primary-transparent",
        checked: true
    },
    {
        id: "checkboxNoLabel4",
        name: "Simon Cowel",
        role: "Service",
        email: "simoncowel234@gmail.com",
        country: "Europe",
        period: "Sep 15 - Oct 12, 2023",
        avatar: "../images/faces/11.jpg",
        badgeClass: "bg-danger-transparent",
        checked: false
    },
    {
        id: "checkboxNoLabel5",
        name: "Mirinda Hers",
        role: "Marketing",
        email: "mirindahers@gmail.com",
        country: "USA",
        period: "Apr 14 - Dec 14, 2023",
        avatar: "../images/faces/8.jpg",
        badgeClass: "bg-warning-transparent",
        checked: true
    },
    {
        id: "checkboxNoLabel3",
        name: "Jacob Smith",
        role: "Social Platform",
        email: "jacobsmith@gmail.com",
        country: "Singapore",
        period: "Feb 25 - Nov 25, 2023",
        avatar: "../images/faces/9.jpg",
        badgeClass: "bg-success-transparent",
        checked: true
    }
];
// Define an array of objects for each device type and count
export const devices = [
    { type: "Mobile", mainClass: "ps-4 py-3 pe-3", count: "1,624", class: "mobile" },
    { type: "Desktop", mainClass: "p-3", count: "1,267", class: "desktop" },
    { type: "Laptop", mainClass: "p-3", count: "1,153", class: "laptop" },
    { type: "Tablet", mainClass: "p-3", count: "679", class: "tablet" }
];
/* Leads By Source Chart */
export const Source = {
    series: [32, 27, 25, 16],
    
    // labels: ["My First Dataset"],
    chart: {
        type: 'donut',
        top: "50%",
        height: 250,
    },
    dataLabels: {
        enabled: false,
    },

    legend: {
        show: false,
    },
    stroke: {
        show: true,
        curve: 'smooth',
        lineCap: 'round',
        colors: ["#fff"],
        width: 0,
        dashArray: 0,
    },
    plotOptions: {
        pie: {
            expandOnClick: false,
            donut: {
                size: '85%',
                labels: {
                    name: {
                        show: true,
                        fontSize: '20px',
                        color: '#495057',
                        offsetY: -4
                    },
                    value: {
                        show: true,
                        fontSize: '18px',
                        color: undefined,
                        offsetY: 8,
                        formatter: function (val) {
                            return val + "%";
                        }
                    },
                }
            }
        }
    },
    colors: ["var(--primary-color)", "rgb(35, 183, 229)", "rgb(245, 184, 73)", "rgb(38, 191, 148)",],
}
/* Leads By Source Chart */
// Define an array of deal statuses with their counts and corresponding classes
export const Status = [
    { status: "Successful Deals", count: 987, class: "primary" },
    { status: "Pending Deals", count: 1073, class: "info" },
    { status: "Rejected Deals", count: 1674, class: "warning" },
    { status: "Upcoming Deals", count: 921, class: "success" }
];
//activities
export const activities = [
    {
        time: '4:45PM',
        indicatorClass: 'bg-primary-transparent',
        text: 'Update of calendar events &',
        link: 'Added new events in next week.',
        linkClass: 'text-primary fw-semibold',
    },
    {
        time: '3 hrs',
        indicatorClass: 'bg-secondary-transparent',
        text: 'New theme for',
        highlightedText: 'Spruko Website',
        highlightedTextClass: 'fw-semibold',
        endtext: 'completed',
        subText: 'Lorem ipsum, dolor sit amet.',
    },
    {
        time: '22 hrs',
        indicatorClass: 'bg-success-transparent',
        text: 'Created a',
        highlightedText: 'New Task',
        highlightedTextClass: 'fw-semibold text-success',
        endtext: 'today',
        icon: 'ri-add-fill text-purple fs-12',
        iconClass: 'bg-purple-transparent ms-1'
    },
    {
        time: 'Today',
        indicatorClass: 'bg-pink-transparent',
        text: 'New member',
        badge: '@andreas gurrero',
        endtext: 'added today to AI Summit.',
    },
    {
        time: '22 hrs',
        indicatorClass: 'bg-warning-transparent',
        text: '32 New people joined summit.',
    },
    {
        time: '12 hrs',
        indicatorClass: 'bg-info-transparent',
        text: 'Neon Tarly added',
        highlightedText: 'Robert Bright',
        highlightedTextClass: 'fw-semibold text-info',
        endtext: 'to AI summit project.',
    },
    {
        time: '4 hrs',
        indicatorClass: 'bg-dark-transparent',
        text: 'Replied to new support request',
        icon: 'ri-checkbox-circle-line text-success fs-16',
        iconClass: 'w-auto h-auto align-middle'
    },
    {
        time: '4 hrs',
        indicatorClass: 'bg-purple-transparent',
        text: 'Completed documentation of',
        link: 'AI Summit.',
        linkClass: 'text-purple text-decoration-underline fw-semibold',
    }
];

