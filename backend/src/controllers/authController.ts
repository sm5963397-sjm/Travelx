import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/User";
import { isDbConnected } from "../config/db";
import { AuthenticatedRequest } from "../middleware/authMiddleware";

// In-memory user store fallback for zero-friction local development
interface MemoryUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  profileImage?: string;
  savedPlaces: string[];
}

const memoryUsers: Map<string, MemoryUser> = new Map([
  [
    "demo@travelx.com",
    {
      id: "usr-demo-001",
      name: "Modern Explorer",
      email: "demo@travelx.com",
      passwordHash: bcrypt.hashSync("adventure2026", 10),
      profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      savedPlaces: ["nagpur-deekshabhoomi", "hawa-mahal"],
    },
  ],
]);

function generateToken(id: string, email: string, name?: string): string {
  const secret = process.env.JWT_SECRET || "travelx_super_secret_jwt_key_2026_modern_travel_explorer";
  return jwt.sign({ id, email, name }, secret, { expiresIn: "7d" });
}

export class AuthController {
  public static async register(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        res.status(400).json({
          success: false,
          message: "Name, email, and password are required.",
        });
        return;
      }

      if (password.length < 6) {
        res.status(400).json({
          success: false,
          message: "Password must be at least 6 characters long.",
        });
        return;
      }

      const normalizedEmail = email.toLowerCase().trim();

      if (isDbConnected()) {
        const existing = await UserModel.findOne({ email: normalizedEmail });
        if (existing) {
          res.status(400).json({
            success: false,
            message: "An account with this email already exists.",
          });
          return;
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const user = await UserModel.create({
          name: name.trim(),
          email: normalizedEmail,
          passwordHash,
          savedPlaces: [],
        });

        const token = generateToken(user._id.toString(), user.email, user.name);

        res.status(201).json({
          success: true,
          message: "Account created successfully.",
          token,
          user: {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            savedPlaces: user.savedPlaces,
          },
        });
        return;
      }

      // Memory Store Fallback
      if (memoryUsers.has(normalizedEmail)) {
        res.status(400).json({
          success: false,
          message: "An account with this email already exists.",
        });
        return;
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const newUser: MemoryUser = {
        id: `usr-${Date.now()}`,
        name: name.trim(),
        email: normalizedEmail,
        passwordHash,
        savedPlaces: [],
      };
      memoryUsers.set(normalizedEmail, newUser);

      const token = generateToken(newUser.id, newUser.email, newUser.name);

      res.status(201).json({
        success: true,
        message: "Account created successfully.",
        token,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          savedPlaces: newUser.savedPlaces,
        },
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || "Failed to register user.",
      });
    }
  }

  public static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({
          success: false,
          message: "Email and password are required.",
        });
        return;
      }

      const normalizedEmail = email.toLowerCase().trim();

      if (isDbConnected()) {
        const user = await UserModel.findOne({ email: normalizedEmail });
        if (!user) {
          res.status(401).json({
            success: false,
            message: "Invalid email or password.",
          });
          return;
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
          res.status(401).json({
            success: false,
            message: "Invalid email or password.",
          });
          return;
        }

        const token = generateToken(user._id.toString(), user.email, user.name);

        res.json({
          success: true,
          message: "Signed in successfully.",
          token,
          user: {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            savedPlaces: user.savedPlaces,
          },
        });
        return;
      }

      // Memory Store Fallback
      const user = memoryUsers.get(normalizedEmail);
      if (!user) {
        res.status(401).json({
          success: false,
          message: "Invalid email or password.",
        });
        return;
      }

      const isMatch = await bcrypt.compare(password, user.passwordHash);
      if (!isMatch) {
        res.status(401).json({
          success: false,
          message: "Invalid email or password.",
        });
        return;
      }

      const token = generateToken(user.id, user.email, user.name);

      res.json({
        success: true,
        message: "Signed in successfully.",
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          savedPlaces: user.savedPlaces,
        },
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || "Failed to log in.",
      });
    }
  }

  public static async getMe(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ success: false, message: "Unauthorized." });
        return;
      }

      if (isDbConnected()) {
        const user = await UserModel.findById(req.user.id).select("-passwordHash");
        if (!user) {
          res.status(404).json({ success: false, message: "User not found." });
          return;
        }

        res.json({
          success: true,
          user: {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            savedPlaces: user.savedPlaces,
          },
        });
        return;
      }

      const found = Array.from(memoryUsers.values()).find((u) => u.id === req.user?.id);
      if (!found) {
        res.status(404).json({ success: false, message: "User not found." });
        return;
      }

      res.json({
        success: true,
        user: {
          id: found.id,
          name: found.name,
          email: found.email,
          savedPlaces: found.savedPlaces,
        },
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || "Failed to get user profile.",
      });
    }
  }
}
