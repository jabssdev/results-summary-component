/* import "./styles.css"; */

async function loadSummaryData() {
	try {
		const response = await fetch("./data.json");
		const data = await response.json();

		const summaryList = document.querySelector(".summary-card__list");
		summaryList.innerHTML = "";

		data.forEach((item) => {
			const categoryClass = item.category.toLowerCase();

			const listItem = `
      <li class="summary-card__item summary-card__item--${categoryClass}">
        <div class="summary-card__item--icon">
          <img src="${item.icon}" alt="" role="presentation" />
          <span class="summary-card__item--title">${item.category}</span>
        </div>
        <div class="summary-card__item--info">
          <span><strong>${item.score}</strong> / 100</span>
        </div>
      </li>
    `;

			summaryList.insertAdjacentHTML("beforeend", listItem);
		});

		const averageScore = Math.round(data.reduce((acc, item) => acc + item.score, 0) / data.length);
		document.querySelector(".result-card__score--number").textContent = Math.round(averageScore);
	} catch (error) {
		console.error("Error loading summary data:", error);
	}
}

document.addEventListener("DOMContentLoaded", loadSummaryData);
