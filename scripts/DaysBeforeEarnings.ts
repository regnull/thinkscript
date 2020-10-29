# DaysBeforeEarnings
# This study shows the approximate number of days before earnings.
# It's not a precise number, and right after the previous earnings we
# have to do an estimate. So the number may jump or drop a few days at
# some points, but should be good within a few weeks before actual earnings.
#
# Copyright (c) 2020 Leonid Gorkin
# regnull@gmail.com
#
# MIT Licence https://opensource.org/licenses/MIT

def beforeEarningsApprox = -GetEventOffset(Events.Earnings, 0);
def afterEarnings = GetEventOffset(Events.Earnings, -1);

# Right after earnings the date of the next one is not known, so we do a best guess.
def beforeEarnings = if afterEarnings < 30 then 64 - afterEarnings else beforeEarningsApprox;

plot BeforeEarningsPlot = beforeEarnings;
