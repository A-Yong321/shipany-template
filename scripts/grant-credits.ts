
import 'dotenv/config';
import { eq } from 'drizzle-orm';
import { db } from '@/core/db';
import { user } from '@/config/db/schema';
import { grantCreditsForUser } from '@/shared/models/credit';

async function grantCredits() {
  const args = process.argv.slice(2);
  const emailArg = args.find((arg) => arg.startsWith('--email='));
  const creditsArg = args.find((arg) => arg.startsWith('--credits='));

  if (!emailArg || !creditsArg) {
    console.error('Usage: npx tsx scripts/grant-credits.ts --email=user@example.com --credits=100');
    process.exit(1);
  }

  const email = emailArg.split('=')[1];
  const credits = parseInt(creditsArg.split('=')[1], 10);

  if (isNaN(credits) || credits <= 0) {
    console.error('Credits must be a positive number.');
    process.exit(1);
  }

  console.log(`🔍 Finding user with email: ${email}...`);
  const [targetUser] = await db().select().from(user).where(eq(user.email, email));

  if (!targetUser) {
    console.error(`❌ User not found: ${email}`);
    process.exit(1);
  }

  console.log(`✅ Found user: ${targetUser.name} (${targetUser.id})`);
  console.log(`💸 Granting ${credits} credits...`);

  await grantCreditsForUser({
    user: targetUser,
    credits: credits,
    description: 'Manual grant via script',
  });

  console.log(`🎉 Successfully granted ${credits} credits to ${email}!`);
  console.log(`Current remaining credits: ${targetUser.credits || 'Refetch to see updated balance'}`);
}

grantCredits()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('❌ Error granting credits:', err);
    process.exit(1);
  });
