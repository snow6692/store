"use server";

import { Store } from "@prisma/client";
import { currentDbUser } from "./userAction";
import prisma from "@/lib/db";

// Function: upsertStore
// Description: Upserts store details into the database, ensuring uniqueness of name,url, email, and phone number.
// Access Level: Seller Only
// Parameters:
//   - store: Partial store object containing details of the store to be upserted.
// Returns: Updated or newly created store details.

export async function upsertStore(store: Partial<Store>) {
  try {
    const dbUser = await currentDbUser();
    if (!dbUser) throw new Error("Unauthenticated.");
    if (dbUser.role !== "SELLER") {
      throw new Error(
        "Unauthorized Access: Seller Privileges Required for Entry.",
      );
    }

    if (!store) throw new Error("Please provide store data.");

    // Check if store with same name, email,url, or phone number already exists

    const existingStore = await prisma.store.findFirst({
      where: {
        AND: [
          {
            OR: [
              { name: store.name },
              { email: store.email },
              { phone: store.phone },
              { url: store.url },
            ],
          },
          {
            NOT: {
              id: store.id,
            },
          },
        ],
      },
    });
    if (existingStore) {
      let errorMessage = "";
      if (existingStore.name === store.name) {
        errorMessage = "A store with the same name already exists";
      } else if (existingStore.email === store.email) {
        errorMessage = "A store with the same email already exists";
      } else if (existingStore.phone === store.phone) {
        errorMessage = "A store with the same phone number already exists";
      } else if (existingStore.url === store.url) {
        errorMessage = "A store with the same URL already exists";
      }
      throw new Error(errorMessage);
    }

    // Upsert store details into the database
    const userId = dbUser.id;
    if (!userId) throw new Error("unAuthorized");
    const storeDetails = await prisma.store.upsert({
        where: {
          id: store.id || "", // Ensuring valid ID or empty string
        },
        update: {
          name: store.name,
          description: store.description,
          email: store.email,
          phone: store.phone,
          url: store.url,
          logo: store.logo,
          cover: store.cover,
          status: store.status,
          averageRating: store.averageRating,
          featured: store.featured,
          returnPolicy: store.returnPolicy,
          defaultSippingService: store.defaultSippingService,
          defaultSippingFees: store.defaultSippingFees,
          defaultDeliveryTimeMin: store.defaultDeliveryTimeMin,
          defaultDeliveryTimeMax: store.defaultDeliveryTimeMax,
        },
        create: {
          name: store.name!,
          description: store.description ?? "",
          email: store.email!,
          phone: store.phone!,
          url: store.url!,
          logo: store.logo!,
          cover: store.cover!,
          status: store.status ?? "PENDING",
          averageRating: store.averageRating ?? 0,
          featured: store.featured ?? false,
          returnPolicy: store.returnPolicy ?? null,
          defaultSippingService: store.defaultSippingService ?? null,
          defaultSippingFees: store.defaultSippingFees ?? null,
          defaultDeliveryTimeMin: store.defaultDeliveryTimeMin ?? null,
          defaultDeliveryTimeMax: store.defaultDeliveryTimeMax ?? null,
          userId: userId, // ✅ Correct way to associate user
        },
      });
      
    return storeDetails;
  } catch (error) {}
}
