# EarningsChange
# 
# Shows the percentage price change on earnings day.
#
# Copyright (c) 2020 Leonid Gorkin
# regnull@gmail.com
#
# MIT Licence https://opensource.org/licenses/MIT

def afterEarnings = GetEventOffset(Events.Earnings, -1);

def delta = (open - close[1]) / close[1];
def change;

if afterEarnings == 1 {
    change = delta;
} else {
    change = change[1];
}

plot ChangePlot = change * 100;
