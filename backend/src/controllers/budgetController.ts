import { Request, Response } from "express";

export class BudgetController {
  public static calculateBudget(req: Request, res: Response): void {
    try {
      const days = Math.max(1, parseInt(req.body.days || "3"));
      const travelers = Math.max(1, parseInt(req.body.travelers || "1"));
      const destination = req.body.destination || "General";

      const dailyStay = parseFloat(req.body.dailyStay || "1200");
      const dailyFood = parseFloat(req.body.dailyFood || "800");
      const dailyTransport = parseFloat(req.body.dailyTransport || "400");
      const dailyAttractions = parseFloat(req.body.dailyAttractions || "300");
      const otherExpenses = parseFloat(req.body.otherExpenses || "0");

      const totalPerDay = dailyStay + dailyFood + dailyTransport + dailyAttractions;
      const totalEstimatedBudget = (totalPerDay * days + otherExpenses) * travelers;

      // Tier comparisons for user clarity
      const tiers = {
        lowBudget: {
          label: "Backpacker / Budget",
          dailyStay: 600,
          dailyFood: 400,
          dailyTransport: 200,
          dailyAttractions: 150,
          estimatedTotal: (600 + 400 + 200 + 150) * days * travelers,
          description: "Hostels/homestays, authentic street food & local buses",
        },
        mediumBudget: {
          label: "Comfort / Moderate",
          dailyStay: 1800,
          dailyFood: 900,
          dailyTransport: 600,
          dailyAttractions: 400,
          estimatedTotal: (1800 + 900 + 600 + 400) * days * travelers,
          description: "3-star AC boutique hotels, casual dining cafes & app cabs",
        },
        premiumBudget: {
          label: "Luxury / Royal",
          dailyStay: 5500,
          dailyFood: 2500,
          dailyTransport: 1800,
          dailyAttractions: 1000,
          estimatedTotal: (5500 + 2500 + 1800 + 1000) * days * travelers,
          description: "Heritage resorts, rooftop fine dining & private chauffeur",
        },
      };

      res.json({
        success: true,
        data: {
          destination,
          days,
          travelers,
          customEstimation: {
            dailyStay,
            dailyFood,
            dailyTransport,
            dailyAttractions,
            otherExpenses,
            totalDailyAverage: totalPerDay,
            totalEstimatedBudget,
            staySharePct: Math.round(((dailyStay * days) / (totalEstimatedBudget || 1)) * 100),
            foodSharePct: Math.round(((dailyFood * days) / (totalEstimatedBudget || 1)) * 100),
            transportSharePct: Math.round(((dailyTransport * days) / (totalEstimatedBudget || 1)) * 100),
            attractionsSharePct: Math.round(((dailyAttractions * days) / (totalEstimatedBudget || 1)) * 100),
          },
          tiers,
          disclaimer: "Estimates are for planning guidelines and do not constitute guaranteed booking prices.",
        },
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message || "Failed to calculate budget." });
    }
  }
}
