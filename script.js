function calculateTime() {
  const taskDays = parseFloat(document.getElementById("taskDays").value) || 0;
  const taskHours = parseFloat(document.getElementById("taskHours").value) || 0;
  const taskMinutes =
    parseFloat(document.getElementById("taskMinutes").value) || 0;
  const potionsUsed =
    parseInt(document.getElementById("potionsUsed").value) || 1;
  const resultElement = document.getElementById("result");

  if (
    taskDays < 0 ||
    taskHours < 0 ||
    taskMinutes < 0 ||
    taskMinutes >= 60 ||
    potionsUsed < 1
  ) {
    resultElement.textContent =
      "Please enter valid values for days, hours, minutes (0-59), and potions (1 or more).";
    return;
  }

  // Total task time in minutes (1 day = 1440 minutes)
  const totalTaskMinutes = taskDays * 1440 + taskHours * 60 + taskMinutes;

  // Total boosted time available (10 hours per potion, 1 hour = 60 minutes)
  const totalBoostedMinutes = potionsUsed * 10 * 60;

  // Check if task can be completed within the boosted time
  if (totalTaskMinutes <= totalBoostedMinutes) {
    const realTimeMinutes = totalTaskMinutes / 10;

    // Format output based on time
    if (realTimeMinutes < 60) {
      const minutes = Math.round(realTimeMinutes);
      resultElement.textContent = `It will take ${minutes} minute${
        minutes > 1 ? "s" : ""
      } to complete the task using the ${potionsUsed} Builder Potion${
        potionsUsed > 1 ? "s" : ""
      }.`;
    } else {
      const hours = Math.floor(realTimeMinutes / 60);
      const minutes = Math.round(realTimeMinutes % 60);
      resultElement.textContent = `It will take ${hours} hour${
        hours > 1 ? "s" : ""
      } ${minutes} minute${
        minutes > 1 ? "s" : ""
      } to complete the task using the ${potionsUsed} Builder Potion${
        potionsUsed > 1 ? "s" : ""
      }.`;
    }

    // Extra output for remaining potion time
    const remainingPotionTime = totalBoostedMinutes - totalTaskMinutes;
    const remainingPotionHours = Math.floor(remainingPotionTime / 60);
    const remainingPotionMinutes = Math.round(remainingPotionTime % 60);

    if (remainingPotionTime > 0) {
      resultElement.textContent += ` After completing the task, the Builder Potion will last for ${remainingPotionHours} hour${
        remainingPotionHours > 1 ? "s" : ""
      } ${remainingPotionMinutes} minute${
        remainingPotionMinutes > 1 ? "s" : ""
      } more.`;
    } else {
      resultElement.textContent += ` After completing the task, the Builder Potion will not last any longer.`;
    }
  } else {
    // If the task duration is longer than the boosted time with potions used
    const remainingTaskMinutes = totalTaskMinutes - totalBoostedMinutes;

    // Calculate the remaining time after all potions are used
    const remainingHours = Math.floor(remainingTaskMinutes / 60);
    const remainingMinutes = remainingTaskMinutes % 60;

    // Suggest number of potions to complete the task
    const neededPotions = Math.ceil(totalTaskMinutes / (10 * 60));

    resultElement.textContent = `It will take ${remainingHours} hour${
      remainingHours > 1 ? "s" : ""
    } ${remainingMinutes} minute${
      remainingMinutes > 1 ? "s" : ""
    } to complete the task using the ${potionsUsed} Builder Potion${
      potionsUsed > 1 ? "s" : ""
    }. If you use ${neededPotions} Builder Potions, you can complete the task in one go.`;
  }
}
