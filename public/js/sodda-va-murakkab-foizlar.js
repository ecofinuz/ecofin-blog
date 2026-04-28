document.addEventListener("DOMContentLoaded", function () {
    const fmt = (n) => {
        if (n >= 1e9) return (n / 1e9).toFixed(1).replace(/\.0$/, "") + " mlrd";
        if (n >= 1e6) return (n / 1e6).toFixed(1).replace(/\.0$/, "") + " mln";
        return n.toLocaleString("uz-UZ");
    };

    const fmtFull = (n) => n.toLocaleString("uz-UZ") + " so'm";

    const principalEl = document.getElementById("principal");
    const rateEl = document.getElementById("rate");
    const yearsEl = document.getElementById("years");

    const ctx = document.getElementById("interestChart").getContext("2d");

    const chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: [],
            datasets: [
                {
                    label: "Sodda foiz",
                    data: [],
                    borderColor: "#1a1a1a",
                    borderWidth: 2,
                    pointRadius: 0,
                    tension: 0,
                    fill: false,
                },
                {
                    label: "Murakkab foiz",
                    data: [],
                    borderColor: "#888",
                    borderWidth: 2,
                    borderDash: [6, 4],
                    pointRadius: 0,
                    tension: 0,
                    fill: false,
                },
            ],
        },
        options: {
            responsive: true,
            animation: { duration: 300 },
            interaction: { mode: "index", intersect: false },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: "#1a1a1a",
                    titleColor: "#999",
                    bodyColor: "#fff",
                    padding: 12,
                    callbacks: {
                        label: (ctx) =>
                            ctx.dataset.label +
                            ": " +
                            fmtFull(Math.round(ctx.raw)),
                    },
                },
            },
            scales: {
                x: {
                    grid: { color: "#e2e0db" },
                    ticks: { color: "#999", font: { size: 12 } },
                },
                y: {
                    grid: { color: "#e2e0db" },
                    ticks: {
                        color: "#999",
                        font: { size: 12 },
                        callback: (v) => fmt(v),
                    },
                },
            },
        },
    });

    function update() {
        const P = +principalEl.value;
        const r = +rateEl.value / 100;
        const T = +yearsEl.value;

        document.getElementById("val-principal").textContent = fmt(P);
        document.getElementById("val-rate").textContent = rateEl.value + "%";
        document.getElementById("val-years").textContent =
            yearsEl.value + " yil";

        const labels = [],
            simple = [],
            compound = [];
        for (let t = 0; t <= T; t++) {
            labels.push(t === 0 ? "Boshida" : t + "-yil");
            simple.push(P * (1 + r * t));
            compound.push(P * Math.pow(1 + r, t));
        }

        chart.data.labels = labels;
        chart.data.datasets[0].data = simple;
        chart.data.datasets[1].data = compound;
        chart.update();

        const finalSimple = P * (1 + r * T);
        const finalCompound = P * Math.pow(1 + r, T);
        const diff = finalCompound - finalSimple;

        document.getElementById("res-simple").textContent = fmtFull(
            Math.round(finalSimple),
        );
        document.getElementById("res-compound").textContent = fmtFull(
            Math.round(finalCompound),
        );
        document.getElementById("res-diff").textContent =
            "+" + fmtFull(Math.round(diff));
    }

    [principalEl, rateEl, yearsEl].forEach((el) =>
        el.addEventListener("input", update),
    );
    update();
});
