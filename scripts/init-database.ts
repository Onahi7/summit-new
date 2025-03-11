import { createClient } from "@supabase/supabase-js"
import dotenv from "dotenv"
import fs from "fs"
import path from "path"

dotenv.config()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const adminEmail = process.env.ADMIN_EMAIL
const adminPassword = process.env.ADMIN_PASSWORD

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase environment variables")
  process.exit(1)
}

if (!adminEmail || !adminPassword) {
  console.error("Missing admin credentials in environment variables")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function initDatabase() {
  console.log("Initializing database...")

  // Read SQL file
  const sqlFilePath = path.join(process.cwd(), "supabase-setup.sql")
  const sqlContent = fs.readFileSync(sqlFilePath, "utf8")

  // Execute SQL
  const { error } = await supabase.rpc("exec_sql", { sql: sqlContent })

  if (error) {
    console.error("Error executing SQL:", error)
    return
  }

  console.log("Database schema initialized successfully")

  // Check if admin exists
  const { data: existingUser } = await supabase
    .from("profiles")
    .select("*")
    .eq("email", adminEmail)
    .eq("role", "admin")
    .single()

  if (!existingUser) {
    // Create admin user in auth
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true,
    })

    if (authError) {
      console.error("Error creating admin user:", authError)
      return
    }

    // Update profile to admin role
    if (authUser.user) {
      const { error: profileError } = await supabase
        .from("profiles")
        .update({ role: "admin" })
        .eq("id", authUser.user.id)

      if (profileError) {
        console.error("Error updating admin profile:", profileError)
        return
      }
    }

    console.log("Admin user created successfully")
  } else {
    console.log("Admin user already exists")
  }

  // Insert conference configuration
  const configs = [
    {
      key: "registration_amount",
      value: 20000,
      description: "Registration fee amount in Naira",
    },
    {
      key: "conference_name",
      value: "7th Annual NAPPS National Education Summit 2024",
      description: "Name of the conference",
    },
    {
      key: "conference_date",
      value: "January 15-17, 2024",
      description: "Date of the conference",
    },
    {
      key: "conference_venue",
      value: "International Conference Center, Abuja",
      description: "Venue of the conference",
    },
    {
      key: "conference_theme",
      value: "ADVANCING DIGITAL TRANSFORMATION IN NIGERIAN PRIVATE EDUCATION",
      description: "Theme of the conference",
    },
  ]

  for (const config of configs) {
    const { error: configError } = await supabase.from("config").upsert(config, { onConflict: "key" })

    if (configError) {
      console.error(`Error inserting config ${config.key}:`, configError)
    }
  }

  console.log("Configuration data inserted successfully")
  console.log("Database initialization completed")
}

initDatabase()
  .catch(console.error)
  .finally(() => process.exit(0))

