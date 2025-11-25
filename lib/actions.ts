'use server';

import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        console.log('Attempting login...');
        console.log('FormData entries:', Array.from(formData.entries()));
        await signIn('credentials', formData);
        console.log('Sign in successful');
    } catch (error) {
        console.error('Login error:', error);
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

const ImageSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    imageUrl: z.string().optional(), // Made optional to handle file upload logic manually
    camera: z.string().optional(),
    telescope: z.string().optional(),
    mount: z.string().optional(),
    integration: z.string().optional(),
});

async function handleFileUpload(file: File | null): Promise<string | null> {
    if (!file || file.size === 0) return null;

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create a unique filename
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${uniqueSuffix}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    const filepath = join(uploadDir, filename);

    await writeFile(filepath, buffer);
    return `/uploads/${filename}`;
}

export async function createImage(prevState: any, formData: FormData) {
    const file = formData.get('imageFile') as File | null;
    let imageUrl = formData.get('imageUrl') as string | null;

    // Handle file upload
    const uploadedPath = await handleFileUpload(file);
    if (uploadedPath) {
        imageUrl = uploadedPath;
    }

    const validatedFields = ImageSchema.safeParse({
        title: formData.get('title'),
        description: formData.get('description'),
        imageUrl: imageUrl,
        camera: formData.get('camera'),
        telescope: formData.get('telescope'),
        mount: formData.get('mount'),
        integration: formData.get('integration'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Image.',
        };
    }

    if (!validatedFields.data.imageUrl) {
        return {
            message: 'Please provide either an Image URL or upload a file.',
        }
    }

    try {
        await prisma.image.create({
            data: {
                ...validatedFields.data,
                imageUrl: validatedFields.data.imageUrl!, // We checked it exists above
            },
        });
    } catch (error) {
        return {
            message: 'Database Error: Failed to Create Image.',
        };
    }

    revalidatePath('/');
    revalidatePath('/admin');
    redirect('/admin');
}

export async function updateImage(id: string, prevState: any, formData: FormData) {
    const file = formData.get('imageFile') as File | null;
    let imageUrl = formData.get('imageUrl') as string | null;

    // Handle file upload
    const uploadedPath = await handleFileUpload(file);
    if (uploadedPath) {
        imageUrl = uploadedPath;
    }

    const validatedFields = ImageSchema.safeParse({
        title: formData.get('title'),
        description: formData.get('description'),
        imageUrl: imageUrl,
        camera: formData.get('camera'),
        telescope: formData.get('telescope'),
        mount: formData.get('mount'),
        integration: formData.get('integration'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update Image.',
        };
    }

    // If no new image URL or file, we might want to keep the old one.
    // But here we are validating the form data which should contain the old URL if not changed
    // because we set defaultValue in the form. 
    // However, if the user clears the URL input and doesn't upload a file, we should check.
    if (!validatedFields.data.imageUrl) {
        // If it's an update, we might need to fetch the existing image to see if we should keep it?
        // But the form should have sent the existing URL if it wasn't touched.
        // If the user cleared it, they might want to remove it? But our schema says optional now?
        // Actually, let's enforce it must exist.
        return {
            message: 'Please provide either an Image URL or upload a file.',
        }
    }

    try {
        await prisma.image.update({
            where: { id },
            data: {
                ...validatedFields.data,
                imageUrl: validatedFields.data.imageUrl!,
            },
        });
    } catch (error) {
        return {
            message: 'Database Error: Failed to Update Image.',
        };
    }

    revalidatePath('/');
    revalidatePath('/admin');
    redirect('/admin');
}

export async function deleteImage(id: string) {
    try {
        await prisma.image.delete({
            where: { id },
        });
        revalidatePath('/');
        revalidatePath('/admin');
    } catch (error) {
        return { message: 'Database Error: Failed to Delete Image.' };
    }
}

export async function handleSignOut() {
    await signOut();
}
