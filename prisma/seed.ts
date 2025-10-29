import { PrismaClient, Role, EquipmentAvailability, WeightVariation, Grips, Muscles, Joints } from "$/generated/prisma";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    // ────────────────────────────────────────────────────────────────
    // 1. Create Admin User
    // ────────────────────────────────────────────────────────────────
    const adminEmail = "super@admin.com";
    const demoEmail = "demo@user.com";

    const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });

    if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash("1234", 10);
        const admin = await prisma.user.create({
            data: {
                name: "Super Admin",
                email: adminEmail,
                password: hashedPassword,
                role: Role.ADMIN,
            },
        });
        const demo = await prisma.user.create({
            data: {
                name: "Demo User",
                email: demoEmail,
                password: hashedPassword,
                role: Role.USER,
            }
        })
        console.log(`Created admin: ${admin.name} (${admin.email})`);
        console.log(`Created demo: ${demo.name} (${demo.email})`);
    } else {
        console.log(`Admin already exists: ${existingAdmin.email}`);
    }

    // ────────────────────────────────────────────────────────────────
    // 2. Seed Exercises with Variations
    // ────────────────────────────────────────────────────────────────
    const exerciseData: Array<{
        name: string;
        description: string;
        equipment: EquipmentAvailability;
        targetMuscles: Muscles[];
        targetJoints: Joints[];
        variations?: Array<{
            weightVariation: WeightVariation;
            grip?: Grips | null;
        }>;
    }> = [
            {
                name: "Normal Curls",
                description: "Standard bicep curl with palms facing up. Builds bicep peak and thickness.",
                equipment: EquipmentAvailability.FREEWEIGHTS,
                targetMuscles: [Muscles.BICEPS],
                targetJoints: [Joints.ELBOWS],
                variations: [
                    { weightVariation: WeightVariation.BARBELL, grip: Grips.PALM_UP },
                    { weightVariation: WeightVariation.DUMBELL, grip: Grips.PALM_UP },
                    { weightVariation: WeightVariation.CABLE, grip: Grips.PALM_UP },
                ],
            },
            {
                name: "Hammer Curls",
                description: "Neutral grip curl targeting brachialis and forearms for thicker arms.",
                equipment: EquipmentAvailability.FREEWEIGHTS,
                targetMuscles: [Muscles.BICEPS, Muscles.TOP_FOREARMS],
                targetJoints: [Joints.ELBOWS],
                variations: [
                    { weightVariation: WeightVariation.DUMBELL, grip: Grips.HAMMER_GRIP },
                    { weightVariation: WeightVariation.CABLE, grip: Grips.HAMMER_GRIP },
                ],
            },
            {
                name: "Forearm Curls",
                description: "Isolates the forearm flexors. Hold barbell/dumbbell and curl wrists upward.",
                equipment: EquipmentAvailability.FREEWEIGHTS,
                targetMuscles: [Muscles.TOP_FOREARMS],
                targetJoints: [Joints.WRISTS],
                variations: [
                    { weightVariation: WeightVariation.BARBELL, grip: Grips.PALM_DOWN },
                    { weightVariation: WeightVariation.DUMBELL, grip: Grips.PALM_DOWN },
                ],
            },
            {
                name: "Wrist Curls",
                description: "Targets wrist flexors. Sit with forearms on thighs, curl wrists up/down.",
                equipment: EquipmentAvailability.FREEWEIGHTS,
                targetMuscles: [Muscles.TOP_FOREARMS],
                targetJoints: [Joints.WRISTS],
                variations: [
                    { weightVariation: WeightVariation.DUMBELL, grip: Grips.PALM_UP },
                    { weightVariation: WeightVariation.BARBELL, grip: Grips.PALM_UP },
                ],
            },
            {
                name: "Tricep Extensions",
                description: "Overhead or lying extension to isolate the triceps.",
                equipment: EquipmentAvailability.FREEWEIGHTS,
                targetMuscles: [Muscles.TRICEPS],
                targetJoints: [Joints.ELBOWS],
                variations: [
                    { weightVariation: WeightVariation.DUMBELL, grip: Grips.HAMMER_GRIP },
                    { weightVariation: WeightVariation.CABLE, grip: Grips.HAMMER_GRIP },
                    { weightVariation: WeightVariation.BARBELL, grip: Grips.PALM_UP },
                ],
            },
            {
                name: "Back Squats",
                description: "King of lower body exercises. Barbell on upper traps, squat to depth.",
                equipment: EquipmentAvailability.GYM,
                targetMuscles: [Muscles.QUADS, Muscles.ASS, Muscles.HAMSTRINGS, Muscles.LOWER_BACK],
                targetJoints: [Joints.KNEES, Joints.HIPS_WAIST],
                variations: [{ weightVariation: WeightVariation.BARBELL, grip: Grips.WIDE_GRIP }],
            },
            {
                name: "Front Squats",
                description: "Quad-dominant squat with barbell across front delts.",
                equipment: EquipmentAvailability.GYM,
                targetMuscles: [Muscles.QUADS, Muscles.UPPER_BACK, Muscles.LOWER_BACK],
                targetJoints: [Joints.KNEES, Joints.HIPS_WAIST],
                variations: [{ weightVariation: WeightVariation.BARBELL, grip: Grips.CLOSE_GRIP }],
            },
            {
                name: "Lunges",
                description: "Unilateral leg exercise for balance and glute activation.",
                equipment: EquipmentAvailability.BODYWEIGHT,
                targetMuscles: [Muscles.QUADS, Muscles.ASS, Muscles.HAMSTRINGS],
                targetJoints: [Joints.KNEES, Joints.HIPS_WAIST],
                variations: [
                    { weightVariation: WeightVariation.BODY, grip: null },
                    { weightVariation: WeightVariation.DUMBELL, grip: null },
                    { weightVariation: WeightVariation.BARBELL, grip: null },
                ],
            },
            {
                name: "Bulgarian Split Squats",
                description: "Rear foot elevated split squat. Intense quad and glute burn.",
                equipment: EquipmentAvailability.ENHANCED_BODYWEIGHT,
                targetMuscles: [Muscles.QUADS, Muscles.ASS],
                targetJoints: [Joints.KNEES, Joints.HIPS_WAIST],
                variations: [
                    { weightVariation: WeightVariation.BODY, grip: null },
                    { weightVariation: WeightVariation.DUMBELL, grip: null },
                ],
            },
            {
                name: "Hip Thrusts",
                description: "Glute bridge with barbell across hips. Best for glute hypertrophy.",
                equipment: EquipmentAvailability.GYM,
                targetMuscles: [Muscles.ASS, Muscles.HAMSTRINGS],
                targetJoints: [Joints.HIPS_WAIST],
                variations: [{ weightVariation: WeightVariation.BARBELL, grip: null }],
            },
            {
                name: "Box Jumps",
                description: "Plyometric jump onto box. Builds explosive power.",
                equipment: EquipmentAvailability.ENHANCED_BODYWEIGHT,
                targetMuscles: [Muscles.QUADS, Muscles.ASS, Muscles.FRONT_CALVES],
                targetJoints: [Joints.KNEES, Joints.ANKLES],
                variations: [{ weightVariation: WeightVariation.BODY, grip: null }],
            },
            {
                name: "Sprints",
                description: "Max effort running. High calorie burn and power development.",
                equipment: EquipmentAvailability.BODYWEIGHT,
                targetMuscles: [Muscles.QUADS, Muscles.HAMSTRINGS, Muscles.FRONT_CALVES],
                targetJoints: [Joints.KNEES, Joints.ANKLES],
                variations: [{ weightVariation: WeightVariation.BODY, grip: null }],
            },
            {
                name: "Jumping Jacks",
                description: "Classic cardio warm-up. Full-body coordination.",
                equipment: EquipmentAvailability.BODYWEIGHT,
                targetMuscles: [Muscles.QUADS, Muscles.FRONT_CALVES, Muscles.FRONT_SHOULDERS],
                targetJoints: [Joints.SHOULDERS, Joints.HIPS_WAIST],
                variations: [{ weightVariation: WeightVariation.BODY, grip: null }],
            },
            {
                name: "Jump Rope",
                description: "High-intensity cardio. Improves footwork and endurance.",
                equipment: EquipmentAvailability.ENHANCED_BODYWEIGHT,
                targetMuscles: [Muscles.FRONT_CALVES, Muscles.QUADS],
                targetJoints: [Joints.ANKLES],
                variations: [{ weightVariation: WeightVariation.BODY, grip: null }],
            },
            {
                name: "Hip Dips",
                description: "Side plank with hip lift. Targets obliques and hip stabilizers.",
                equipment: EquipmentAvailability.BODYWEIGHT,
                targetMuscles: [Muscles.OBLIQUES, Muscles.HIPS],
                targetJoints: [Joints.HIPS_WAIST],
                variations: [{ weightVariation: WeightVariation.BODY, grip: null }],
            },
            {
                name: "Sit Ups",
                description: "Classic core exercise. Targets upper abs.",
                equipment: EquipmentAvailability.BODYWEIGHT,
                targetMuscles: [Muscles.UPPER_ABS],
                targetJoints: [Joints.HIPS_WAIST],
                variations: [{ weightVariation: WeightVariation.BODY, grip: null }],
            },
            {
                name: "Crunches",
                description: "Short-range ab flexion. Isolates upper abs.",
                equipment: EquipmentAvailability.BODYWEIGHT,
                targetMuscles: [Muscles.UPPER_ABS],
                targetJoints: [Joints.HIPS_WAIST],
                variations: [{ weightVariation: WeightVariation.BODY, grip: null }],
            },
            {
                name: "Oblique Sit Ups",
                description: "Sit-up with twist to target obliques.",
                equipment: EquipmentAvailability.BODYWEIGHT,
                targetMuscles: [Muscles.OBLIQUES],
                targetJoints: [Joints.HIPS_WAIST],
                variations: [{ weightVariation: WeightVariation.BODY, grip: null }],
            },
            {
                name: "Wide Pull Ups",
                description: "Wide grip pull-up. Emphasizes lats and rear delts.",
                equipment: EquipmentAvailability.ENHANCED_BODYWEIGHT,
                targetMuscles: [Muscles.UPPER_BACK, Muscles.BACK_SHOULDERS, Muscles.BICEPS],
                targetJoints: [Joints.SHOULDERS, Joints.ELBOWS],
                variations: [{ weightVariation: WeightVariation.BODY, grip: Grips.WIDE_GRIP }],
            },
            {
                name: "Chin Ups",
                description: "Underhand grip pull-up. More bicep involvement.",
                equipment: EquipmentAvailability.ENHANCED_BODYWEIGHT,
                targetMuscles: [Muscles.BICEPS, Muscles.UPPER_BACK],
                targetJoints: [Joints.SHOULDERS, Joints.ELBOWS],
                variations: [{ weightVariation: WeightVariation.BODY, grip: Grips.PALM_UP }],
            },
            {
                name: "Pull Ups",
                description: "Standard overhand grip pull-up. Full upper back builder.",
                equipment: EquipmentAvailability.ENHANCED_BODYWEIGHT,
                targetMuscles: [Muscles.UPPER_BACK, Muscles.BICEPS, Muscles.BACK_SHOULDERS],
                targetJoints: [Joints.SHOULDERS, Joints.ELBOWS],
                variations: [{ weightVariation: WeightVariation.BODY, grip: Grips.WIDE_GRIP }],
            },
            {
                name: "Shoulder Flies",
                description: "Lateral raise to build shoulder width.",
                equipment: EquipmentAvailability.FREEWEIGHTS,
                targetMuscles: [Muscles.CENTER_SHOULDERS],
                targetJoints: [Joints.SHOULDERS],
                variations: [
                    { weightVariation: WeightVariation.DUMBELL, grip: null },
                    { weightVariation: WeightVariation.CABLE, grip: null },
                ],
            },
            {
                name: "Rear Delt Flies",
                description: "Targets rear delts for posture and upper back definition.",
                equipment: EquipmentAvailability.FREEWEIGHTS,
                targetMuscles: [Muscles.BACK_SHOULDERS],
                targetJoints: [Joints.SHOULDERS],
                variations: [
                    { weightVariation: WeightVariation.DUMBELL, grip: Grips.HAMMER_GRIP },
                    { weightVariation: WeightVariation.CABLE, grip: null },
                ],
            },
            {
                name: "Shoulder Press",
                description: "Overhead press for overall shoulder mass.",
                equipment: EquipmentAvailability.FREEWEIGHTS,
                targetMuscles: [Muscles.FRONT_SHOULDERS, Muscles.CENTER_SHOULDERS, Muscles.TRICEPS],
                targetJoints: [Joints.SHOULDERS],
                variations: [
                    { weightVariation: WeightVariation.BARBELL, grip: Grips.WIDE_GRIP },
                    { weightVariation: WeightVariation.DUMBELL, grip: null },
                ],
            },
            {
                name: "Lat Pulldown",
                description: "Cable pull to mimic pull-up motion.",
                equipment: EquipmentAvailability.MACHINES,
                targetMuscles: [Muscles.UPPER_BACK, Muscles.BICEPS],
                targetJoints: [Joints.SHOULDERS, Joints.ELBOWS],
                variations: [
                    { weightVariation: WeightVariation.CABLE, grip: Grips.WIDE_GRIP },
                    { weightVariation: WeightVariation.CABLE, grip: Grips.CLOSE_GRIP },
                ],
            },
            {
                name: "Bent Over Row",
                description: "Hinge and pull to build mid-back thickness.",
                equipment: EquipmentAvailability.FREEWEIGHTS,
                targetMuscles: [Muscles.UPPER_BACK, Muscles.TRAPS, Muscles.BACK_SHOULDERS],
                targetJoints: [Joints.SHOULDERS, Joints.HIPS_WAIST],
                variations: [
                    { weightVariation: WeightVariation.BARBELL, grip: Grips.PALM_DOWN },
                    { weightVariation: WeightVariation.DUMBELL, grip: Grips.PALM_DOWN },
                ],
            },
            {
                name: "Cable Row",
                description: "Seated cable row for mid-back and lats.",
                equipment: EquipmentAvailability.CABLES,
                targetMuscles: [Muscles.UPPER_BACK, Muscles.BICEPS],
                targetJoints: [Joints.SHOULDERS],
                variations: [
                    { weightVariation: WeightVariation.CABLE, grip: Grips.CLOSE_GRIP },
                    { weightVariation: WeightVariation.CABLE, grip: Grips.WIDE_GRIP },
                ],
            },
            {
                name: "Dumbell Curls",
                description: "Standard dumbbell bicep curl.",
                equipment: EquipmentAvailability.FREEWEIGHTS,
                targetMuscles: [Muscles.BICEPS],
                targetJoints: [Joints.ELBOWS],
                variations: [{ weightVariation: WeightVariation.DUMBELL, grip: Grips.PALM_UP }],
            },
            {
                name: "Dumbell Shoulder Press",
                description: "Seated or standing dumbbell press.",
                equipment: EquipmentAvailability.FREEWEIGHTS,
                targetMuscles: [Muscles.FRONT_SHOULDERS, Muscles.CENTER_SHOULDERS],
                targetJoints: [Joints.SHOULDERS],
                variations: [{ weightVariation: WeightVariation.DUMBELL, grip: null }],
            },
            {
                name: "Dumbell Tricep Extensions",
                description: "Overhead or lying tricep extension with dumbbell.",
                equipment: EquipmentAvailability.FREEWEIGHTS,
                targetMuscles: [Muscles.TRICEPS],
                targetJoints: [Joints.ELBOWS],
                variations: [{ weightVariation: WeightVariation.DUMBELL, grip: null }],
            },
            {
                name: "Dumbell Bulgarian Split Squats",
                description: "Rear foot elevated split squat with dumbbells.",
                equipment: EquipmentAvailability.FREEWEIGHTS,
                targetMuscles: [Muscles.QUADS, Muscles.ASS],
                targetJoints: [Joints.KNEES, Joints.HIPS_WAIST],
                variations: [{ weightVariation: WeightVariation.DUMBELL, grip: null }],
            },
            {
                name: "Dumbell Shoulder Flies",
                description: "Lateral raise with dumbbells.",
                equipment: EquipmentAvailability.FREEWEIGHTS,
                targetMuscles: [Muscles.CENTER_SHOULDERS],
                targetJoints: [Joints.SHOULDERS],
                variations: [{ weightVariation: WeightVariation.DUMBELL, grip: null }],
            },
            {
                name: "Barbell Row",
                description: "Bent-over barbell row for back thickness.",
                equipment: EquipmentAvailability.GYM,
                targetMuscles: [Muscles.UPPER_BACK, Muscles.TRAPS],
                targetJoints: [Joints.SHOULDERS, Joints.HIPS_WAIST],
                variations: [{ weightVariation: WeightVariation.BARBELL, grip: Grips.PALM_DOWN }],
            },
            {
                name: "Barbell Curl",
                description: "Classic standing barbell bicep curl.",
                equipment: EquipmentAvailability.GYM,
                targetMuscles: [Muscles.BICEPS],
                targetJoints: [Joints.ELBOWS],
                variations: [{ weightVariation: WeightVariation.BARBELL, grip: Grips.PALM_UP }],
            },
            {
                name: "Deadlift",
                description: "Full-body pull from floor. King of strength.",
                equipment: EquipmentAvailability.GYM,
                targetMuscles: [Muscles.HAMSTRINGS, Muscles.ASS, Muscles.LOWER_BACK, Muscles.TRAPS],
                targetJoints: [Joints.HIPS_WAIST, Joints.KNEES],
                variations: [{ weightVariation: WeightVariation.BARBELL, grip: Grips.PALM_DOWN }],
            },
            {
                name: "Romanian Dead Lift",
                description: "Hinge-focused deadlift for posterior chain.",
                equipment: EquipmentAvailability.GYM,
                targetMuscles: [Muscles.HAMSTRINGS, Muscles.ASS, Muscles.LOWER_BACK],
                targetJoints: [Joints.HIPS_WAIST],
                variations: [
                    { weightVariation: WeightVariation.BARBELL, grip: Grips.PALM_DOWN },
                    { weightVariation: WeightVariation.DUMBELL, grip: null },
                ],
            },
            {
                name: "Dumbell Romanian Dead Lift",
                description: "Romanian deadlift with dumbbells for unilateral balance.",
                equipment: EquipmentAvailability.FREEWEIGHTS,
                targetMuscles: [Muscles.HAMSTRINGS, Muscles.ASS],
                targetJoints: [Joints.HIPS_WAIST],
                variations: [{ weightVariation: WeightVariation.DUMBELL, grip: null }],
            },
            {
                name: "Long Jumps",
                description: "Explosive horizontal jump for distance. Builds lower body power and coordination.",
                equipment: EquipmentAvailability.BODYWEIGHT,
                targetMuscles: [Muscles.QUADS, Muscles.ASS, Muscles.FRONT_CALVES, Muscles.HAMSTRINGS],
                targetJoints: [Joints.KNEES, Joints.ANKLES, Joints.HIPS_WAIST],
                variations: [{ weightVariation: WeightVariation.BODY, grip: null }],
            },
            {
                name: "Rapid Hip Raises",
                description: "Fast glute bridge reps. Explosive hip extension for power and glute activation.",
                equipment: EquipmentAvailability.BODYWEIGHT,
                targetMuscles: [Muscles.ASS, Muscles.HAMSTRINGS],
                targetJoints: [Joints.HIPS_WAIST],
                variations: [{ weightVariation: WeightVariation.BODY, grip: null }],
            },
            {
                name: "Planks",
                description: "Isometric core hold. Builds full core stability and endurance.",
                equipment: EquipmentAvailability.BODYWEIGHT,
                targetMuscles: [Muscles.UPPER_ABS, Muscles.CENTER_ABS, Muscles.LOWER_ABS, Muscles.OBLIQUES, Muscles.LOWER_BACK],
                targetJoints: [Joints.SHOULDERS, Joints.HIPS_WAIST],
                variations: [{ weightVariation: WeightVariation.BODY, grip: null }],
            },
            {
                name: "Toe Touches",
                description: "Standing or lying reach to touch toes. Stretches hamstrings and improves flexibility.",
                equipment: EquipmentAvailability.BODYWEIGHT,
                targetMuscles: [Muscles.HAMSTRINGS, Muscles.LOWER_BACK],
                targetJoints: [Joints.HIPS_WAIST],
                variations: [{ weightVariation: WeightVariation.BODY, grip: null }],
            },
            {
                name: "Hip Abductor",
                description: "Seated or standing machine to push legs outward. Targets outer hips and glutes.",
                equipment: EquipmentAvailability.MACHINES,
                targetMuscles: [Muscles.HIPS, Muscles.ASS],
                targetJoints: [Joints.HIPS_WAIST],
                variations: [{ weightVariation: WeightVariation.CABLE, grip: null }], // or machine, but CABLE is closest
            },
            {
                name: "Glute Extension",
                description: "Machine-based glute kickback. Isolates glute max for shape and strength.",
                equipment: EquipmentAvailability.MACHINES,
                targetMuscles: [Muscles.ASS],
                targetJoints: [Joints.HIPS_WAIST],
                variations: [{ weightVariation: WeightVariation.CABLE, grip: null }],
            },
            {
                name: "Glute Bridge",
                description: "Bodyweight or barbell hip thrust from ground. Foundational glute builder.",
                equipment: EquipmentAvailability.BODYWEIGHT,
                targetMuscles: [Muscles.ASS, Muscles.HAMSTRINGS],
                targetJoints: [Joints.HIPS_WAIST],
                variations: [
                    { weightVariation: WeightVariation.BODY, grip: null },
                    { weightVariation: WeightVariation.BARBELL, grip: null },
                ],
            },
            {
                name: "Hamstring Curls",
                description: "Lying or seated leg curl machine. Isolates hamstrings for posterior chain balance.",
                equipment: EquipmentAvailability.MACHINES,
                targetMuscles: [Muscles.HAMSTRINGS],
                targetJoints: [Joints.KNEES],
                variations: [{ weightVariation: WeightVariation.CABLE, grip: null }], // or machine
            },
            {
                name: "Toe Lifts",
                description: "Calf raises with toes elevated (e.g., on plate). Targets upper calves and ankle stability.",
                equipment: EquipmentAvailability.FREEWEIGHTS,
                targetMuscles: [Muscles.FRONT_CALVES],
                targetJoints: [Joints.ANKLES],
                variations: [
                    { weightVariation: WeightVariation.BODY, grip: null },
                    { weightVariation: WeightVariation.DUMBELL, grip: null },
                    { weightVariation: WeightVariation.BARBELL, grip: null },
                ],
            },
            {
                name: "Hip Curl",
                description: "With weight near the knee, bring knee to chest. Targets hip flexors and lower abs.",
                equipment: EquipmentAvailability.FREEWEIGHTS,
                targetMuscles: [Muscles.HIPS, Muscles.LOWER_ABS],
                targetJoints: [Joints.HIPS_WAIST],
                variations: [
                    { weightVariation: WeightVariation.DUMBELL, grip: null },
                    { weightVariation: WeightVariation.CABLE, grip: null },
                ],
            },
            {
                name: "Leg Raises",
                description: "Hanging or lying leg raise using cable ankle strap. Targets lower abs and hip flexors.",
                equipment: EquipmentAvailability.CABLES,
                targetMuscles: [Muscles.LOWER_ABS, Muscles.HIPS, Muscles.ASS],
                targetJoints: [Joints.HIPS_WAIST],
                variations: [{ weightVariation: WeightVariation.CABLE, grip: null }],
            },
        ];

    const x = {
        "long jumps": "",
        "rapid hip raises": "",
        "planks": "",
        "toe touches": "",
        "hip abductor": "",// uses machine
        "glute extension": "", //uses machine
        "glute bridge": "", //machine or barbell
        "hamstring curls": "", // machine
        "Toe lifts": "", // freeweight
        "Hip Curl": "with weight near the knee, bring knee to chest", // freeweight or machine
        "Leg raises": "", // works ass and uses cables

    }

    // ────────────────────────────────────────────────────────────────
    // 3. Upsert Exercises + Variations
    // ────────────────────────────────────────────────────────────────
    for (const ex of exerciseData) {
        const exercise = await prisma.exercise.upsert({
            where: { name: ex.name },
            update: {}, // no update needed
            create: {
                name: ex.name,
                description: ex.description,
                equipment: ex.equipment,
                targetMuscles: { set: ex.targetMuscles },
                targetJoints: { set: ex.targetJoints },
                variations: ex.variations
                    ? {
                        create: ex.variations.map((v) => ({
                            weightVariation: v.weightVariation,
                            grip: v.grip,
                        })),
                    }
                    : undefined,
            },
            include: { variations: true },
        });

        console.log(`Seeded: ${exercise.name} (${exercise.variations.length} variations)`);
    }

    console.log("Seed completed successfully!");
}

main()
    .catch((e) => {
        console.error("Seed failed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });