import Lead from "../models/Lead.js";

export const createLead = async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      fitnessGoal,
      source,
      trialDate,
      notes,
      followUpDate,
    } = req.body;

    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name and phone number are required.",
      });
    }

    const lead = await Lead.create({
      name,
      phone,
      email: email || "",
      fitnessGoal: fitnessGoal || "",
      source: source || "website",
      status: trialDate ? "trial_booked" : "new",
      trialDate: trialDate || null,
      notes: notes || "",
      followUpDate: followUpDate || null,
    });

    return res.status(201).json({
      success: true,
      message: "Lead created successfully.",
      lead,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Could not create lead.",
      error: error.message,
    });
  }
};

export const bookFreeTrial = async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      fitnessGoal,
      trialDate,
      preferredTime,
      message,
    } = req.body;

    if (!name || !phone || !trialDate) {
      return res.status(400).json({
        success: false,
        message: "Name, phone number, and trial date are required.",
      });
    }

    const notesArray = [];

    if (preferredTime) {
      notesArray.push(`Preferred time: ${preferredTime}`);
    }

    if (message) {
      notesArray.push(`Message: ${message}`);
    }

    const lead = await Lead.create({
      name,
      phone,
      email: email || "",
      fitnessGoal: fitnessGoal || "",
      source: "website",
      status: "trial_booked",
      trialDate,
      notes: notesArray.join(" | "),
      followUpDate: trialDate,
    });

    return res.status(201).json({
      success: true,
      message:
        "Free trial booked successfully. Gym team will contact the member soon.",
      lead,
      automation: {
        whatsappConfirmation: "Pending integration",
        emailConfirmation: "Pending integration",
        followUpReminder: "Created from trial date",
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Could not book free trial.",
      error: error.message,
    });
  }
};

export const getAllLeads = async (req, res) => {
  try {
    const { status, source, fitnessGoal } = req.query;

    const filter = {};

    if (status) {
      filter.status = status;
    }

    if (source) {
      filter.source = source;
    }

    if (fitnessGoal) {
      filter.fitnessGoal = fitnessGoal;
    }

    const leads = await Lead.find(filter)
      .populate("assignedTo", "name email phone role")
      .populate("convertedMember", "name email phone memberId")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: leads.length,
      leads,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Could not fetch leads.",
      error: error.message,
    });
  }
};

export const getSingleLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id)
      .populate("assignedTo", "name email phone role")
      .populate("convertedMember", "name email phone memberId");

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found.",
      });
    }

    return res.status(200).json({
      success: true,
      lead,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Could not fetch lead.",
      error: error.message,
    });
  }
};

export const updateLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found.",
      });
    }

    const {
      name,
      phone,
      email,
      fitnessGoal,
      source,
      status,
      trialDate,
      assignedTo,
      notes,
      followUpDate,
    } = req.body;

    lead.name = name ?? lead.name;
    lead.phone = phone ?? lead.phone;
    lead.email = email ?? lead.email;
    lead.fitnessGoal = fitnessGoal ?? lead.fitnessGoal;
    lead.source = source ?? lead.source;
    lead.status = status ?? lead.status;
    lead.trialDate = trialDate ?? lead.trialDate;
    lead.assignedTo = assignedTo ?? lead.assignedTo;
    lead.notes = notes ?? lead.notes;
    lead.followUpDate = followUpDate ?? lead.followUpDate;

    const updatedLead = await lead.save();

    return res.status(200).json({
      success: true,
      message: "Lead updated successfully.",
      lead: updatedLead,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Could not update lead.",
      error: error.message,
    });
  }
};

export const updateLeadStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required.",
      });
    }

    const allowedStatuses = [
      "new",
      "contacted",
      "trial_booked",
      "converted",
      "lost",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid lead status.",
      });
    }

    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found.",
      });
    }

    lead.status = status;
    await lead.save();

    return res.status(200).json({
      success: true,
      message: "Lead status updated successfully.",
      lead,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Could not update lead status.",
      error: error.message,
    });
  }
};

export const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found.",
      });
    }

    await lead.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Lead deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Could not delete lead.",
      error: error.message,
    });
  }
};