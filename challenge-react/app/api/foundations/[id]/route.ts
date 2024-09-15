// export async function POST(request: Request) {
//     try {
//       const { title, desc, department, subjectType } = await request.json();

//       if (!title) {
//         throw new Error("Title is required");
//       }
//       if (!desc) {
//         throw new Error("Description is required");
//       }

//       if (!Object.values(EDepartment).includes(department)) {
//         throw new Error("Department is required");
//       }

//       let validSubjectType: ESubjectType | null = null;
//       if (subjectType && Object.values(ESubjectType).includes(subjectType)) {
//         validSubjectType = subjectType;
//       }

//       const newMappingData = await myPrisma.iDataMapping.create({
//         data: {
//           title,
//           desc,
//           department,
//           subjectType: validSubjectType,
//         },
//       });
//       return new Response(JSON.stringify(newMappingData), {
//         status: 201,
//         headers: { "Content-Type": "application/json" },
//       });
//     } catch (err: any) {
//       return new Response(JSON.stringify({ error: err.message }), {
//         status: 500,
//         headers: { "Content-Type": "application/json" },
//       });
//     }
//   }
