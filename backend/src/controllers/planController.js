import Plan from "../models/Plan.js";

export const createPlan = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      durationInDays,
      planType,
      features,
      isPopular,
    } = req.body;

    if (!name || !price || !durationInDays) {
      return res.status(400).json({
        success: false,
        message: "Plan name, price, and duration are required.",
      });
    }

    const plan = await Plan.create({
      name,
      description: description || "",
      price,
      durationInDays,
      planType: planType || "basic",
      features: features || [],
      isPopular: isPopular || false,
    });

    return res.status(201).json({
      success: true,
      message: "Plan created successfully.",
      plan,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Could not create plan.",
      error: error.message,
    });
  }
};

export const getActivePlans = async (req, res) => {
  try {
    const plans = await Plan.find({ isActive: true }).sort({
      price: 1,
    });

    return res.status(200).json({
      success: true,
      count: plans.length,
      plans,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Could not fetch plans.",
      error: error.message,
    });
  }
};

export const getAllPlans = async (req, res) => {
  try {
    const plans = await Plan.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: plans.length,
      plans,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Could not fetch all plans.",
      error: error.message,
    });
  }
};

export const getSinglePlan = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Plan not found.",
      });
    }

    return res.status(200).json({
      success: true,
      plan,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Could not fetch plan.",
      error: error.message,
    });
  }
};

export const updatePlan = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Plan not found.",
      });
    }

    const {
      name,
      description,
      price,
      durationInDays,
      planType,
      features,
      isPopular,
      isActive,
    } = req.body;

    plan.name = name ?? plan.name;
    plan.description = description ?? plan.description;
    plan.price = price ?? plan.price;
    plan.durationInDays = durationInDays ?? plan.durationInDays;
    plan.planType = planType ?? plan.planType;
    plan.features = features ?? plan.features;
    plan.isPopular = isPopular ?? plan.isPopular;
    plan.isActive = isActive ?? plan.isActive;

    const updatedPlan = await plan.save();

    return res.status(200).json({
      success: true,
      message: "Plan updated successfully.",
      plan: updatedPlan,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Could not update plan.",
      error: error.message,
    });
  }
};

export const deactivatePlan = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Plan not found.",
      });
    }

    plan.isActive = false;
    await plan.save();

    return res.status(200).json({
      success: true,
      message: "Plan deactivated successfully.",
      plan,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Could not deactivate plan.",
      error: error.message,
    });
  }
};

export const activatePlan = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Plan not found.",
      });
    }

    plan.isActive = true;
    await plan.save();

    return res.status(200).json({
      success: true,
      message: "Plan activated successfully.",
      plan,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Could not activate plan.",
      error: error.message,
    });
  }
};